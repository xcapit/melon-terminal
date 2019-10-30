import { Resolver } from '~/graphql';
import { Participation } from '@melonproject/melonjs';

export const id: Resolver<Participation> = shares => shares.contract.address;
export const address: Resolver<Participation> = shares => shares.contract.address;
