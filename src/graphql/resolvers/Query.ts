import { Resolver } from '..';

export const network: Resolver = (parent, args, context) => {
  return context.network;
};

export const block: Resolver = (parent, args, context) => {
  return context.block;
};

export const accounts: Resolver = (parent, args, context) => {
  return context.loaders.accounts();
};

export const fund: Resolver = async (parent, args, context) => {
  const exists = !!(await context.loaders.fundName(args.address));
  return exists && args.address;
};
