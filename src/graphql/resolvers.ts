import * as Rx from 'rxjs';
import Web3 from 'web3';
import { fromWei } from "web3-utils";
import { toAsyncIterator } from './utils/toAsyncIterator';

export interface Context {
  client: Web3,
}

export const Query = {
  network: async (_: any, __: any, context: Context) => {
    if (!context.client) {
      return null;
    }

    const client = context.client;
    return client.eth.net.getNetworkType();
  },
  accounts: async (_: any, __: any, context: Context) => {
    if (!context.client) {
      return null;
    }

    const client = context.client;
    const account = await client.eth.getAccounts();
    return account;
  },
  balances: async (_: any, __: any, context: Context) => {
    if (!context.client) {
      return null;
    }

    const client = context.client;
    const accounts = await client.eth.getAccounts();
    const balances = await Promise.all((accounts || []).map(async (address) => {
      const balance = await client.eth.getBalance(address);
      return parseFloat(fromWei(balance));
    }));

    return balances;
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
