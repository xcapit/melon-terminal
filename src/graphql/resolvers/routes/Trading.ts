import { Resolver } from '~/graphql';
import { Trading } from '@melonproject/melonjs';

export const address: Resolver<Trading> = trading => trading.contract.address;
