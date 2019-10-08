import BigNumber from 'bignumber.js';
import { Block } from 'web3-eth';
import { Resolver } from '..';

export const id: Resolver<Block> = block => block.hash;
export const hash: Resolver<Block> = block => block.hash;
export const number: Resolver<Block> = block => new BigNumber(block.number);
export const timestamp: Resolver<Block> = block => new Date((block.timestamp as number) * 1000);
