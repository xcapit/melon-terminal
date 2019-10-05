import { Resolver } from "..";

export const network: Resolver = (parent, args, context) => {
  return context.network;
};

export const block: Resolver = (parent, args, context) => {
  return context.block;
};

export const accounts: Resolver = (parent, args, context) => {
  return context.loaders.accounts();
};

export const funds: Resolver = (parent, args, context) => {
  return context.loaders.totalFunds();
};
