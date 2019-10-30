import { Resolver } from '~/graphql';

export const address: Resolver<string> = address => address;

interface BalanceArgs {
  token: string;
}

export const balance: Resolver<string, BalanceArgs> = async (_, args, context) => {
  return context.loaders.balanceOf(args.token);
};
