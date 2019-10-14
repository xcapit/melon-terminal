import BigNumber from 'bignumber.js';
import { fromWei } from 'web3-utils';
import { Resolver } from '~/graphql';

export const id: Resolver<string> = address => address;
export const address: Resolver<string> = address => address;

interface BalanceArgs {
  token: string;
}

export const balance: Resolver<string, BalanceArgs> = async (address, args, context) => {
  return context.loaders.balanceOf(args.token);
};
