import {
  getFundName,
  getLastFundId,
  getFundRoutes,
  getFundManager,
  getFundCreator,
  getFundCreationTime,
  getFundCalculations,
  getLatestPriceFeedUpdate,
} from '@melonproject/melonjs';
import { Context } from '~/graphql';
import { createLoader } from './utils/createLoader';

const commonConfig = (context: Context) => ({
  environment: context.environment,
  block: context.block,
});

export const block = createLoader('block', async (context, number: number) => {
  const eth = context.environment.eth;
  return eth.getBlock(number);
});

export const totalFunds = createLoader('totalFunds', context => {
  return getLastFundId(commonConfig(context));
});

export const latestPriceFeedUpdate = createLoader('latestPriceFeedUpdate', context => {
  return getLatestPriceFeedUpdate(commonConfig(context));
});

export const fundRoutes = createLoader('fundRoutes', async (context, address: string) => {
  return getFundRoutes(commonConfig(context), address);
});

export const fundName = createLoader('fundName', async (context, address: string) => {
  return getFundName(commonConfig(context), address);
});

export const fundManager = createLoader('fundManager', async (context, address: string) => {
  return getFundManager(commonConfig(context), address);
});

export const fundCreator = createLoader('fundCreator', async (context, address: string) => {
  return getFundCreator(commonConfig(context), address);
});

export const fundCreationTime = createLoader('fundCreationTime', async (context, address: string) => {
  return getFundCreationTime(commonConfig(context), address);
});

export const fundCalculations = createLoader('fundCalculations', async (context, address: string) => {
  const loadRoutes = context.loaders.fundRoutes as ReturnType<typeof fundRoutes>;
  const routes = await loadRoutes(address);
  if (!routes.accounting) {
    return null;
  }

  return getFundCalculations(commonConfig(context), routes.accounting!);
});
