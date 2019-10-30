import { Resolver } from '~/graphql';
import { Trading } from '@melonproject/melonjs';

export const id: Resolver<Trading> = trading => trading.contract.address;
export const address: Resolver<Trading> = trading => trading.contract.address;
