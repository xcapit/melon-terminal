import BigNumber from 'bignumber.js';
import { fromWei } from 'web3-utils';
import { Resolver } from '..';

export const id: Resolver<string> = address => address;
export const address: Resolver<string> = address => address;

export const balance: Resolver<string> = async (address, args, context) => {
  const balance = await context.environment.eth.getBalance(address);
  return new BigNumber(fromWei(balance));
};
