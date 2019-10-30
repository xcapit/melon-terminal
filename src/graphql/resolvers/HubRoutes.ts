import { Resolver } from '~/graphql';
import { Accounting } from '@melonproject/melonjs';
import { HubRoutes } from '@melonproject/melonjs/contracts/Hub';

export const accounting: Resolver<HubRoutes> = (routes, _, context) => {
  return routes.accounting && new Accounting(context.environment, routes.accounting);
};
