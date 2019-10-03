import Web3 from 'web3';
import * as Rx from 'rxjs';
import { fromWei } from "web3-utils";
import { toAsyncIterator } from './utils/toAsyncIterator';

export interface Context {
  web3: Web3,
}

export const Query = {
  network: async (_: any, __: any, context: Context) => {
    return context.web3.eth.net.getNetworkType();
  },
  block: async (_: any, __: any, context: Context) => {
    return context.web3.eth.getBlockNumber();
  },
  accounts: async (_: any, __: any, context: Context) => {
    try {
      const accounts = await context.web3.eth.getAccounts();
      return accounts;
    }
    catch (e) {
      return [];
    }
  },
};

export const Account = {
  id: (address: string) => address,
  address: (address: string) => address,
  balance: async (address: any, __: any, context: Context) => {
    const balance = await context.web3.eth.getBalance(address);
    return parseFloat(fromWei(balance));
  },
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
