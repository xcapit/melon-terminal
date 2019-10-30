import { Resolver } from '~/graphql';
import { CanonicalPriceFeed } from '@melonproject/melonjs';

export const id: Resolver<CanonicalPriceFeed> = source => source.contract.address;
export const address: Resolver<CanonicalPriceFeed> = source => source.contract.address;
export const lastUpdate: Resolver<CanonicalPriceFeed> = (source, _, context) => source.getLastUpdate(context.block);
