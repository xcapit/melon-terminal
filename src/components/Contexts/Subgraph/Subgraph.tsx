import * as React from 'react';
import { Provider, createClient, dedupExchange, fetchExchange } from 'urql';
import { cacheExchange, ResolverConfig } from '@urql/exchange-graphcache';
import { devtoolsExchange } from '@urql/devtools';
import BigNumber from 'bignumber.js';

export interface SubgraphProps {}

const asDate = (input: any) => new Date((input as number) * 1000);
const asBigNumber = (value: any) => new BigNumber(value);

export const SubgraphProvider: React.FC<React.PropsWithChildren<SubgraphProps>> = ({ children }) => {
  const client = React.useMemo(() => {
    const resolvers: ResolverConfig = {
      FundHolding: {
        timestamp: (parent) => asDate(parent.timestamp),
      },
      Fund: {
        inception: (parent) => asDate(parent.inception),
      },
      Holding: {
        quantity: (parent) => asBigNumber(parent.quantity),
      },
    };

    return createClient({
      url: 'https://api.thegraph.com/subgraphs/name/melonproject/melon-dev',
      exchanges: [
        devtoolsExchange,
        dedupExchange,
        cacheExchange({
          resolvers,
        }),
        fetchExchange,
      ],
    });
  }, []);

  return <Provider value={client}>{children}</Provider>;
};
