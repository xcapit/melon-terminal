import * as R from 'ramda';
import BigNumber from 'bignumber.js';
import { fromWei } from 'web3-utils';
import { Token, Address, Accounting } from '@melonproject/melonjs';
import { Context } from '.';

export const block = (context: Context) => (number: number) => {
  const eth = context.environment.client;
  return eth.getBlock(number);
};

export const balanceOf = (context: Context) => {
  return async (token: Address | string) => {
    const account = context.accounts && context.accounts[0];
    if (!account) {
      return new BigNumber(0);
    }

    if (token === 'ETH') {
      const balance = await context.environment.client.getBalance(account);
      return new BigNumber(fromWei(balance));
    }

    const instance = new Token(context.environment, token);
    const balance = await instance.getBalanceOf(account);
    return new BigNumber(fromWei(balance.toFixed()));
  };
};

export const accountingCalculations = (context: Context) => {
  return R.memoizeWith(
    (accounting: Accounting) => accounting.contract.address,
    (accounting: Accounting) => {
      return accounting.getCalculationResults(context.block);
    }
  );
};
