import BigNumber from 'bignumber.js';
import { Version, PriceSource, Hub, Accounting, Token } from '@melonproject/melonjs';
import { createLoader } from './utils/createLoader';
import { fromWei } from 'web3-utils';

export const block = createLoader('block', async (context, number: BigNumber) => {
  const eth = context.environment.client;
  return eth.getBlock(number.toFixed(0));
});

export const totalFunds = createLoader('totalFunds', context => {
  const version = new Version(context.environment);
  return version.getLastFundId(context.block);
});

export const latestPriceFeedUpdate = createLoader('latestPriceFeedUpdate', context => {
  const source = new PriceSource(context.environment);
  return source.getLastUpdate(context.block);
});

export const fundRoutes = createLoader('fundRoutes', async (context, address: string) => {
  const hub = new Hub(context.environment, address);
  return hub.routes(context.block);
});

export const fundName = createLoader('fundName', async (context, address: string) => {
  const hub = new Hub(context.environment, address);
  return hub.name(context.block);
});

export const fundManager = createLoader('fundManager', async (context, address: string) => {
  const hub = new Hub(context.environment, address);
  return hub.manager(context.block);
});

export const fundCreator = createLoader('fundCreator', async (context, address: string) => {
  const hub = new Hub(context.environment, address);
  return hub.creator(context.block);
});

export const fundCreationTime = createLoader('fundCreationTime', async (context, address: string) => {
  const hub = new Hub(context.environment, address);
  return hub.creationTime(context.block);
});

export const fundCalculations = createLoader('fundCalculations', async (context, address: string) => {
  const loadRoutes = context.loaders.fundRoutes as ReturnType<typeof fundRoutes>;
  const routes = await loadRoutes(address);
  if (!routes.accounting) {
    return null;
  }

  const accounting = new Accounting(context.environment, routes.accounting!);
  return accounting.performCalculations(context.block);
});

export const balanceOf = createLoader('balanceOf', async (context, token: string) => {
  const account = context.accounts && context.accounts[0];
  if (!account) {
    return new BigNumber(0);
  }

  if (token === 'ETH') {
    const balance = await context.environment.client.getBalance(account);
    return new BigNumber(fromWei(balance));
  }

  const instance = Token.forSymbol(context.environment, token);
  return instance.balanceOf(account);
});
