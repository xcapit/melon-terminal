import { Resolver } from '~/graphql';
import { Version } from '@melonproject/melonjs';

export const id: Resolver<Version> = version => version.contract.address;
export const address: Resolver<Version> = version => version.contract.address;
