import { Resolver } from '~/graphql';
import { Shares } from '@melonproject/melonjs';
import { fromWei } from 'web3-utils';

export const address: Resolver<Shares> = shares => shares.contract.address;
export const totalSupply: Resolver<Shares> = async (shares, _, context) => {
  const totalSupply = await shares.getTotalSupply(context.block);
  return fromWei(totalSupply.toFixed());
};
