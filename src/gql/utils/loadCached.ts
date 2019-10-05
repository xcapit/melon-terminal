import { Context } from "..";

export const loadCached = <T extends (...args: any[]) => any>(
  context: Context,
  cacheKey: ((...args: Parameters<T>) => string) | string,
  loadFn: T,
): (...args: Parameters<T>) => ReturnType<T> => {
  // Decorate the passed loader function so that whenever it is
  // called, we first check the cache for the current block and the
  // given cache key before forwarding the query.
  return (...args: Parameters<T>): ReturnType<T> => {
    const key = typeof cacheKey === 'function' ? cacheKey(...args) : cacheKey;
    const prefixedKey = `${context.block}:${key}`;
    if (context.cache.has(prefixedKey)) {
      return context.cache.get(prefixedKey)!;
    }

    const promise = loadFn(...args);
    context.cache.set(prefixedKey, promise);
    return promise;
  };
};
