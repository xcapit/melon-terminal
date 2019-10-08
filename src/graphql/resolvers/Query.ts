import { Resolver } from '~/graphql/setup';

export const network: Resolver = (parent, args, context) => {
  if (context.network === 1) {
    return 'MAINNET';
  }

  if (context.network === 42) {
    return 'KOVAN';
  }

  return null;
};

export const block: Resolver = (parent, args, context) => {
  return context.loaders.block(context.block);
};

export const accounts: Resolver = (parent, args, context) => {
  return context.loaders.accounts();
};

export const account: Resolver = async (parent, args, context) => {
  const accounts = await context.loaders.accounts();
  return accounts && accounts[0];
};

export const fund: Resolver = async (parent, args, context) => {
  const exists = !!(await context.loaders.fundName(args.address));
  return exists && args.address;
};

export const totalFunds: Resolver = (parent, args, context) => {
  return context.loaders.totalFunds();
};
