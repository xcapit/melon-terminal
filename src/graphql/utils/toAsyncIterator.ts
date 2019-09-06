import { $$asyncIterator } from 'iterall';
import * as Rx from 'rxjs';

interface PromiseCapability {
  promise?: Promise<any>;
  resolve?: (a: any) => void;
  reject?: (a: any) => void;
}

export const toAsyncIterator = (observable$: Rx.Observable<any>) => {
  const promiseCapability = () => {
    const x: PromiseCapability = {};

    x.promise = new Promise((a, b) => {
      x.resolve = a;
      x.reject = b;
    });

    return x;
  };

  let subscription: Rx.Subscription;
  let promise: PromiseCapability;

  return {
    next() {
      if (typeof promise === 'undefined') {
        promise = promiseCapability();
      }

      if (typeof subscription === 'undefined') {
        subscription = observable$.subscribe(
          value => {
            promise.resolve && promise.resolve({ value, done: false });
            promise = promiseCapability();
          },
          error => {
            promise.reject && promise.reject(error);
          },
          () => {
            promise.resolve && promise.resolve({ value: undefined, done: true });
          },
        );
      }

      return promise.promise;
    },
    return() {
      subscription && subscription.unsubscribe();
      return Promise.resolve({ value: undefined, done: true });
    },
    throw(error: any) {
      subscription && subscription.unsubscribe();
      return Promise.reject(error);
    },
    // tslint:disable-next-line
    [$$asyncIterator as any]() {
      return this;
    },
  };
};
