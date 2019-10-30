import { Resolver } from '~/graphql';
import { Vault } from '@melonproject/melonjs';

export const id: Resolver<Vault> = vault => vault.contract.address;
export const address: Resolver<Vault> = vault => vault.contract.address;
