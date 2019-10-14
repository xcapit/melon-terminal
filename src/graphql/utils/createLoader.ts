import { Context } from '~/graphql';
import { loadCached } from './loadCached';

export const createLoader = <A extends any[], T extends (context: Context, ...args: A) => any>(
  cacheKey: ((context: Context, ...args: A) => string) | string,
  loadFn: T
) => {
  return (context: Context): ((...args: A) => ReturnType<T>) => {
    const cacheKeyFinal =
      typeof cacheKey === 'string'
        ? cacheKey
        : (...args: A) => {
            return cacheKey(context, ...args);
          };

    const loadFnFinal = (...args: A) => {
      return loadFn(context, ...args);
    };

    return loadCached(context, cacheKeyFinal, loadFnFinal);
  };
};
