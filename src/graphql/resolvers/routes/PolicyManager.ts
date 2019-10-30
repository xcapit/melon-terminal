import { Resolver } from '~/graphql';
import { PolicyManager } from '@melonproject/melonjs';

export const address: Resolver<PolicyManager> = shares => shares.contract.address;
