import {
  getFundName,
  getLastFundId,
  getFundRoutes,
  getFundManager,
  getFundCreator,
  getFundCreationTime,
  getFundCalculations,
} from '@melonproject/melonjs';
import { loadCached } from '~/graphql/utils/loadCached';
import { Context } from '~/graphql/setup';

const commonConfig = (context: Context) => ({
  environment: context.environment,
  block: context.block,
});

export const block = (context: Context) =>
  loadCached(context, 'block', async (number: number) => {
    const eth = context.environment.eth;
    return eth.getBlock(number);
  });

export const totalFunds = (context: Context) =>
  loadCached(context, 'totalFunds', () => {
    return getLastFundId(commonConfig(context));
  });

export const fundRoutes = (context: Context) =>
  loadCached(context, 'fundRoutes', async (address: string) => {
    return getFundRoutes(commonConfig(context), address);
  });

export const fundName = (context: Context) =>
  loadCached(context, 'fundName', async (address: string) => {
    return getFundName(commonConfig(context), address);
  });

export const fundManager = (context: Context) =>
  loadCached(context, 'fundManager', async (address: string) => {
    return getFundManager(commonConfig(context), address);
  });

export const fundCreator = (context: Context) =>
  loadCached(context, 'fundCreator', async (address: string) => {
    return getFundCreator(commonConfig(context), address);
  });

export const fundCreationTime = (context: Context) =>
  loadCached(context, 'fundCreationTime', async (address: string) => {
    return getFundCreationTime(commonConfig(context), address);
  });

export const fundCalculations = (context: Context) =>
  loadCached(context, 'fundCalculations', async (address: string) => {
    const loadRoutes = context.loaders.fundRoutes as ReturnType<typeof fundRoutes>;
    const routes = await loadRoutes(address);
    return routes.accounting && getFundCalculations(commonConfig(context), routes.accounting);
  });
