import { fromWei } from 'web3-utils';
import { Accounting } from '@melonproject/melonjs';
import { Resolver } from '~/graphql';
import { findToken } from '~/utils/findToken';

export const address: Resolver<Accounting> = accounting => accounting.contract.address;
export const sharePrice: Resolver<Accounting> = async (accounting, _, context) => {
  const calculations = await context.loaders.accountingCalculations(accounting);
  return fromWei(calculations.sharePrice.toFixed());
};

export const grossAssetValue: Resolver<Accounting> = async (accounting, _, context) => {
  const calculations = await context.loaders.accountingCalculations(accounting);
  return fromWei(calculations.gav.toFixed());
};

export const netAssetValue: Resolver<Accounting> = async (accounting, _, context) => {
  const calculations = await context.loaders.accountingCalculations(accounting);
  return fromWei(calculations.nav.toFixed());
};

export const holdings: Resolver<Accounting> = async (accounting, _, context) => {
  const holdings = await accounting.getFundHoldings(context.block);
  return Object.keys(holdings).map(address => ({
    token: findToken(context.deployment, address),
    amount: fromWei(holdings[address].toFixed()),
  }));
};
