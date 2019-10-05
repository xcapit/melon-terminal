import { createAsyncIterator, isAsyncIterable } from 'iterall';

export const ensureIterable = (data: any) => {
  if (isAsyncIterable(data)) {
    return data;
  }

  return createAsyncIterator([data]);
};
