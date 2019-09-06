import * as Rx from 'rxjs';
import { Eth } from "web3-eth";
import { fromWei } from "web3-utils";
import { toAsyncIterator } from './utils/toAsyncIterator';

export const Query = {
  hello: () => 'Hello world!',
  balance: async (_: any, __: any, context: any) => {
    if (typeof context.client !== 'undefined') {
      const client = context.client as Eth;
      const result = await client.getBalance('0x307012a4904267fD20C117bB71DC61c3e505d3F6');
      return parseFloat(fromWei(result));
    }

    return null;
  }
};

export const Subscription = {
  counter: {
    resolve: (value: any) => value,
    subscribe: () => {
      const stream$ = Rx.timer(0, 1000);
      return toAsyncIterator(stream$);
    },
  },
};
