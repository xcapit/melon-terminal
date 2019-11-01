import { Resolver } from '~/graphql';
import { NetworkEnum } from '~/types';
import { Hub, CanonicalPriceFeed } from '@melonproject/melonjs';

export const block: Resolver = (_, __, context) => {
  return context.loaders.block(context.block);
};

export const network: Resolver = (_, __, context) => {
  if (context.environment.network === process.env.ETHEREUM_NETWORK) {
    return context.environment.network;
  }

  return NetworkEnum.INVALID;
};

export const account: Resolver = async (_, __, context) => {
  return context.environment.account;
};

export const prices: Resolver = async (_, __, context) => {
  const address = context.deployment.melonContracts.priceSource;
  return new CanonicalPriceFeed(context.environment, address);
};

export const fund: Resolver = async (_, args, context) => {
  try {
    const hub = new Hub(context.environment, args.address);
    return hub.getCreator(context.block) && hub;
  } catch (e) {
    return null;
  }
};
