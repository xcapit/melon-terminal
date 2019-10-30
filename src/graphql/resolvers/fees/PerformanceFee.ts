import { fromWei } from 'web3-utils';
import { Hub, PerformanceFee } from '@melonproject/melonjs';
import { Resolver } from '~/graphql';

export const rate: Resolver<[Hub, PerformanceFee]> = async ([hub, performance], _, context) => {
  const rate = await performance.getPerformanceFeeRate(hub.contract.address, context.block);
  return fromWei(rate.multipliedBy(100).toFixed());
};

export const period: Resolver<[Hub, PerformanceFee]> = async ([hub, performance], _, context) => {
  const period = await performance.getPerformanceFeePeriod(hub.contract.address, context.block);
  return period ? period / (60 * 60 * 24) : 0;
};
