import BigNumber from 'bignumber.js';
import { Version, CanonicalPriceFeed, Hub, Accounting, Token } from '@melonproject/melonjs';
import { fromWei } from 'web3-utils';
import { Context } from '.';

export const block = (context: Context) => (number: number) => {
  const eth = context.environment.client;
  return eth.getBlock(number);
};

export const totalFunds = (context: Context) => () => {
  const version = Version.forDeployment(context.environment);

  return () => {
    version.getLastFundId(context.block);
  };
};

export const latestPriceFeedUpdate = (context: Context) => {
  const source = CanonicalPriceFeed.forDeployment(context.environment);

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

    const instance = Token.forDeployment(context.environment, token);
    return instance.getBalanceOf(account);
  };
};
