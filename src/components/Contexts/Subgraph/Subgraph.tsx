import * as React from 'react';
import BigNumber from 'bignumber.js';
import { Provider, createClient, dedupExchange, fetchExchange } from 'urql';
import { cacheExchange, ResolverConfig, Data } from '@urql/exchange-graphcache';
import { devtoolsExchange } from '@urql/devtools';
import { useConfig, getConfig } from '~/config';
import { NetworkEnum } from '~/types';
import { useEnvironment } from '~/hooks/useEnvironment';

export interface SubgraphProps {}

export const SubgraphProvider: React.FC<React.PropsWithChildren<SubgraphProps>> = ({ children }) => {
  const config = useConfig() || getConfig(NetworkEnum.MAINNET)!;
  const environment = useEnvironment()!;

  const client = React.useMemo(() => {
    const asDate = (field: string) => (data: Data) => {
      return new Date((data[field] as number) * 1000);
    };

    const asBigNumber = (field: string) => (data: Data) => {
      return new BigNumber(data[field] as string);
    };

    const defaults = {
      timestamp: asDate('timestamp'),
    };

    const resolvers: ResolverConfig = {
      ContractEvent: {
        ...defaults,
      },
      Share: {
        ...defaults,
        shares: asBigNumber('shares'),
      },
      Holding: {
        ...defaults,
        quantity: asBigNumber('quantity'),
      },
      Portfolio: {
        ...defaults,
      },
      Payout: {
        ...defaults,
        shares: asBigNumber('shares'),
      },
      ManagementFeePayout: {
        ...defaults,
        shares: asBigNumber('shares'),
      },
      PerformanceFeePayout: {
        ...defaults,
        shares: asBigNumber('shares'),
      },
      State: {
        ...defaults,
      },
      Fund: {
        inception: asDate('inception'),
      },
      PerformanceFee: {
        rate: asBigNumber('rate'),
        period: asBigNumber('period'),
        initialization: asDate('initialization'),
      },
      ManagementFee: {
        rate: asBigNumber('rate'),
      },
      CustomPolicy: {
        ...defaults,
      },
      UserWhitelistPolicy: {
        ...defaults,
      },
      PriceTolerancePolicy: {
        ...defaults,
      },
      MaxPositionsPolicy: {
        ...defaults,
      },
      MaxConcentrationPolicy: {
        ...defaults,
      },
      AssetBlacklistPolicy: {
        ...defaults,
      },
      AssetWhitelistPolicy: {
        ...defaults,
      },
      SharesAddition: {
        ...defaults,
      },
      SharesRedemption: {
        ...defaults,
      },
      SharesReward: {
        ...defaults,
      },
      InvestmentRequest: {
        ...defaults,
      },
      Investment: {
        ...defaults,
        shares: asBigNumber('shares'),
      },
      Trade: {
        ...defaults,
        amountBought: asBigNumber('amountBought'),
        amountSold: asBigNumber('amountSold'),
      },
      FundHolding: {
        ...defaults,
      },
    };

    return createClient({
      url: config.subgraphNew,
      exchanges: [devtoolsExchange, dedupExchange, cacheExchange({ resolvers }), fetchExchange],
    });
  }, [config, environment]);

  return <Provider value={client}>{children}</Provider>;
};
