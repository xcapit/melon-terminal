import { Resolver } from '~/graphql';
import { NetworkEnum } from '~/types';

export const block: Resolver = (parent, args, context) => {
  return context.loaders.block(context.block);
};

export const network: Resolver = (parent, args, context) => {
  if (context.network === process.env.NETWORK) {
    return context.network;
  }

  return context.network ? NetworkEnum.INVALID : NetworkEnum.OFFLINE;
};

export const accounts: Resolver = (parent, args, context) => {
  return context.accounts;
};

export const account: Resolver = async (parent, args, context) => {
  return context.accounts && context.accounts[0];
};

export const fund: Resolver = async (parent, args, context) => {
  try {
    const exists = !!(await context.loaders.fundName(args.address));
    return exists && args.address;
  } catch (e) {}
};

export const totalFunds: Resolver = (parent, args, context) => {
  return context.loaders.totalFunds();
};

export const latestPriceFeedUpdate: Resolver = (parent, args, context) => {
  return context.loaders.latestPriceFeedUpdate();
};
