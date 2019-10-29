import { Resolver } from '~/graphql';
import { fromWei } from 'web3-utils';

export const id: Resolver<string> = address => address;
export const address: Resolver<string> = address => address;

export const name: Resolver<string> = (address, args, context) => {
  return context.loaders.fundName(address);
};

export const manager: Resolver<string> = (address, args, context) => {
  return context.loaders.fundManager(address);
};

export const routes: Resolver<string> = (address, args, context) => {
  return context.loaders.fundRoutes(address);
};

export const creator: Resolver<string> = (address, args, context) => {
  return context.loaders.fundCreator(address);
};

export const creationTime: Resolver<string> = (address, args, context) => {
  return context.loaders.fundCreationTime(address);
};

export const sharePrice: Resolver<string> = async (address, args, context) => {
  const result = await context.loaders.fundCalculations(address);
  return result && fromWei(result.sharePrice.toFixed());
};

export const gav: Resolver<string> = async (address, args, context) => {
  const result = await context.loaders.fundCalculations(address);
  return result && fromWei(result.gav.toFixed());
};

export const nav: Resolver<string> = async (address, args, context) => {
  const result = await context.loaders.fundCalculations(address);
  return result && fromWei(result.nav.toFixed());
};
