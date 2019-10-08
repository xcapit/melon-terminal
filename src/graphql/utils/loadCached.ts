import md5 from 'md5';
import { Context } from '~/graphql/setup';

export const loadCached = <T extends (...args: any[]) => any>(
  context: Context,
  cacheKey: ((...args: Parameters<T>) => string) | string,
  loadFn: T
): ((...args: Parameters<T>) => ReturnType<T>) => {
  // Decorate the passed loader function so that whenever it is
  // called, we first check the cache for the current block and the
  // given cache key before forwarding the query.
  return (...args: Parameters<T>): ReturnType<T> => {
    const key = typeof cacheKey === 'function' ? cacheKey(...args) : cacheKey;
    const suffix = typeof cacheKey !== 'function' && args && args.length ? `:${md5(JSON.stringify(args))}` : '';
    const prefix = `${context.block}:`;

    const lookup = prefix + key + suffix;
    if (context.cache.has(lookup)) {
      return context.cache.get(lookup)!;
    }

    const promise = loadFn(...args);
    context.cache.set(lookup, promise);
    return promise;
  };
};
