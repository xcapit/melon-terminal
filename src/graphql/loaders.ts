import BigNumber from 'bignumber.js';
import { Version, CanonicalPriceFeed, Hub, Accounting, Token } from '@melonproject/melonjs';
import { fromWei } from 'web3-utils';
import { Context } from '.';
import { findToken } from './utils/findToken';

export const block = (context: Context) => (number: number) => {
  const eth = context.environment.client;
  return eth.getBlock(number);
};

export const totalFunds = (context: Context) => () => {
  const deployment = process.env.DEPLOYMENT;
  const address = deployment.melonContracts.version;
  const version = new Version(context.environment, address);

  return () => {
    version.getLastFundId(context.block);
  };
};

export const latestPriceFeedUpdate = (context: Context) => {
  const deployment = process.env.DEPLOYMENT;
  const address = deployment.melonContracts.priceSource;
  const source = new CanonicalPriceFeed(context.environment, address);

  return () => {
    return source.getLastUpdate(context.block);
  };
};

export const fundRoutes = (context: Context) => {
  return async (address: string) => {
    const hub = new Hub(context.environment, address);
    const routes = await hub.getRoutes(context.block);
    return routes;
  };
};

export const fundName = (context: Context) => {
  return async (address: string) => {
    const hub = new Hub(context.environment, address);
    const name = await hub.getName(context.block);
    return name;
  };
};

export const fundManager = (context: Context) => {
  return (address: string) => {
    const hub = new Hub(context.environment, address);
    return hub.getManager(context.block);
  };
};

export const fundCreator = (context: Context) => {
  return (address: string) => {
    const hub = new Hub(context.environment, address);
    return hub.getCreator(context.block);
  };
};

export const fundCreationTime = (context: Context) => {
  return (address: string) => {
    const hub = new Hub(context.environment, address);
    return hub.getCreationTime(context.block);
  };
};

export const fundCalculations = (context: Context) => {
  return async (address: string) => {
    const loadRoutes = context.loaders.fundRoutes as ReturnType<typeof fundRoutes>;
    const routes = await loadRoutes(address);
    if (!routes.accounting) {
      return null;
    }

    const accounting = new Accounting(context.environment, routes.accounting!);
    return accounting.getCalculationResults(context.block);
  };
};

export const balanceOf = (context: Context) => {
  return async (token: string) => {
    const account = context.accounts && context.accounts[0];
    if (!account) {
      return new BigNumber(0);
    }

    if (token === 'ETH') {
      const balance = await context.environment.client.getBalance(account);
      return new BigNumber(fromWei(balance));
    }

    const definition = findToken(process.env.DEPLOYMENT, token);
    const instance = new Token(context.environment, definition.address);
    return instance.getBalanceOf(account);
  };
};
