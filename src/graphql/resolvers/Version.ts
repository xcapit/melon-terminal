import { Resolver } from '~/graphql';
import { Version } from '@melonproject/melonjs';

export const address: Resolver<Version> = version => version.contract.address;
