import { Resolver } from '~/graphql/setup';

export const block: Resolver = (parent, args, context) => {
  return context.loaders.block(context.block);
};

export const network: Resolver = (parent, args, context) => {
  return context.network;
};

export const accounts: Resolver = (parent, args, context) => {
  return context.accounts;
};

export const account: Resolver = async (parent, args, context) => {
  return context.accounts[0];
};

export const fund: Resolver = async (parent, args, context) => {
  const exists = !!(await context.loaders.fundName(args.address));
  return exists && args.address;
};

export const totalFunds: Resolver = (parent, args, context) => {
  return context.loaders.totalFunds();
};
