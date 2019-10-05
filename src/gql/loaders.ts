import { Context } from ".";
import { loadCached } from './utils/loadCached';
import { makeCall } from '@melonproject/melonjs';

export interface Loaders {
  accounts: ReturnType<typeof accounts>;
  totalFunds: ReturnType<typeof totalFunds>;
};

export const accounts = (context: Context) => loadCached(context, 'accounts', (() => {
  const eth = context.environment.eth;
  return eth.getAccounts().catch(() => []) as Promise<string[]>;
}));

export const totalFunds = (context: Context) => loadCached(context, 'totalFunds', (async () => {
  const address = context.environment.deployment.melonContracts.version;
  const result = await makeCall({
    contract: 'Version',
    method: 'getLastFundId',
    environment: context.environment,
    address,
  });

  return parseInt(result.toString(), 10);
}));
