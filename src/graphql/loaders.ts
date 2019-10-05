import { getFundName, getLastFundId, getFundRoutes, getFundManager, getFundCreator, getFundCreationTime } from '@melonproject/melonjs'
import { loadCached } from './utils/loadCached';
import { Context } from ".";

export interface Loaders {
  accounts: ReturnType<typeof accounts>;
  totalFunds: ReturnType<typeof totalFunds>;
  fundRoutes: ReturnType<typeof fundRoutes>;
  fundName: ReturnType<typeof fundName>;
  fundManager: ReturnType<typeof fundManager>;
  fundCreator: ReturnType<typeof fundCreator>;
  fundCreationTime: ReturnType<typeof fundCreationTime>;
};

export const accounts = (context: Context) => loadCached(context, 'accounts', (() => {
  const eth = context.environment.eth;
  return eth.getAccounts().catch(() => []) as Promise<string[]>;
}));

export const totalFunds = (context: Context) => loadCached(context, 'totalFunds', (() => {
  return getLastFundId({
    environment: context.environment,
    block: context.block,
  });
}));

export const fundRoutes = (context: Context) => loadCached(context, 'fundRoutes', (async (address: string) => {
  return getFundRoutes({
    environment: context.environment,
    block: context.block,
  }, address);
}));

export const fundName = (context: Context) => loadCached(context, 'fundName', (async (address: string) => {
  return getFundName({
    environment: context.environment,
    block: context.block,
  }, address);
}));

export const fundManager = (context: Context) => loadCached(context, 'fundManager', (async (address: string) => {
  return getFundManager({
    environment: context.environment,
    block: context.block,
  }, address);
}));

export const fundCreator = (context: Context) => loadCached(context, 'fundCreator', (async (address: string) => {
  return getFundCreator({
    environment: context.environment,
    block: context.block,
  }, address);
}));

export const fundCreationTime = (context: Context) => loadCached(context, 'fundCreationTime', (async (address: string) => {
  return getFundCreationTime({
    environment: context.environment,
    block: context.block,
  }, address);
}));
