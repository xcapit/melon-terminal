import { Resolver } from '~/graphql';
import { Accounting } from '@melonproject/melonjs';
import { fromWei } from 'web3-utils';

export const id: Resolver<Accounting> = accounting => accounting.contract.address;
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
