import React, { useState, useMemo, useEffect, createContext } from 'react';
import LRUCache from 'lru-cache';
import ApolloClient from 'apollo-client';
import * as Rx from 'rxjs';
import * as R from 'ramda';
import { Eth } from 'web3-eth';
import { switchMap, distinctUntilChanged, shareReplay } from 'rxjs/operators';
import { ApolloLink } from 'apollo-link';
import { HttpProvider } from 'web3-providers';
import { onError } from 'apollo-link-error';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { createSchemaLink, createSchema, createQueryContext } from '~/graphql/setup';
import { ApolloProvider } from '@apollo/react-hooks';

// TODO: Fix this type.
export type ConnectionProvider = any;

export enum ConnectionProviderTypeEnum {
  'DEFAULT' = 'DEFAULT',
  'FRAME' = 'FRAME',
  'METAMASK' = 'METAMASK',
  'CUSTOM' = 'CUSTOM',
}

export interface Connection {
  eth: Eth;
  network?: number;
  accounts?: string[];
}

export interface ConnectionProviderResource extends Rx.Unsubscribable {
  eth: Eth;
}

export interface ApolloProviderContext {
  client: ApolloClient<NormalizedCacheObject>;
}

export interface OnChainContextValue extends ApolloProviderContext {
  set: (provider: ConnectionProviderTypeEnum, connection: Rx.Observable<Connection>) => void;
  connection: Rx.Observable<Connection>;
  provider: ConnectionProviderTypeEnum;
}

export interface TheGraphContextValue extends ApolloProviderContext {
  // Nothing to add here.
}

export const OnChainContext = createContext<OnChainContextValue>({} as OnChainContextValue);
export const TheGraphContext = createContext<TheGraphContextValue>(
  (() => {
    const uri = `https://api.thegraph.com/subgraphs/name/${process.env.SUBGRAPH}`;
    const link = createHttpLink({ uri });
    const cache = new InMemoryCache();
    const client = new ApolloClient({ link, cache });
    return { client };
  })()
);

export const checkConnection = async (eth: Eth) => {
  const [network, accounts] = await Promise.all([
    eth.net.getId().catch(() => undefined),
    eth.getAccounts().catch(() => undefined),
  ]);

  return { eth, network, accounts } as Connection;
};

const createDefaultConnection = () => {
  const eth$ = Rx.using(
    () => {
      const provider = new HttpProvider('https://mainnet.infura.io/v3/8332aa03fcfa4c889aeee4d0e0628660');
      const eth = new Eth(provider, undefined, {
        transactionConfirmationBlocks: 1,
      });

      return {
        eth,
        unsubscribe: () => provider.disconnect(),
      };
    },
    resource => Rx.of((resource as ConnectionProviderResource).eth)
  );

  return eth$.pipe(
    switchMap(eth => checkConnection(eth)),
    distinctUntilChanged((a, b) => R.equals(a, b))
  );
};

const createErrorLink = () => {
  return onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path, extensions }) => {
        const fields = path && path.join('.');
        console.error('[GQL ERROR]: Message: %s, Path: %s, Locations: %o', message, fields, locations);

        const stacktrace = extensions && extensions.exception && extensions.exception.stacktrace;
        if (stacktrace && stacktrace.length) {
          stacktrace.forEach((line: string) => {
            console.error(line);
          });
        }
      });
    }

    if (networkError) {
      console.error('[GQL NETWORK ERROR]: %o', networkError);
    }
  });
};

const useOnChainApollo = (connection: Rx.Observable<Connection>) => {
  const schema = useMemo(() => createSchema(), []);
  const apollo = useMemo(() => {
    const context = createQueryContext(connection);
    const data = createSchemaLink({ schema, context });
    const error = createErrorLink();
    const link = ApolloLink.from([error, data]);
    const cache = new InMemoryCache({
      addTypename: true,
    });

    return new ApolloClient({
      link,
      cache,
      defaultOptions: {
        watchQuery: {
          errorPolicy: 'all',
          fetchPolicy: 'network-only',
        },
        query: {
          errorPolicy: 'all',
          fetchPolicy: 'network-only',
        },
        mutate: {
          errorPolicy: 'all',
        },
      },
    });
  }, [connection]);

  useEffect(() => {
    const reset = () => apollo.resetStore();
    const subscription = connection.subscribe(reset, reset, reset);
    return () => subscription.unsubscribe();
  }, [connection, apollo]);

  return apollo;
};

export const ConnectionProvider: React.FC = React.memo(props => {
  const [provider, setProvider] = useState(ConnectionProviderTypeEnum.DEFAULT);
  const connections = useMemo(() => new Rx.BehaviorSubject<Rx.Observable<Connection>>(createDefaultConnection()), []);
  const connection = useMemo(
    () =>
      connections.pipe(
        switchMap(connection => connection),
        shareReplay(1)
      ),
    [connections]
  );

  const set = (provider: ConnectionProviderTypeEnum, connection: Rx.Observable<Connection>) => {
    setProvider(provider);
    connections.next(connection);
  };

  const client = useOnChainApollo(connection);

  return (
    <OnChainContext.Provider value={{ client, connection, provider, set }}>
      <ApolloProvider client={client}>{props.children}</ApolloProvider>
    </OnChainContext.Provider>
  );
});

export const RequireSecureConnection: React.FC = props => {
  // TODO: Render a modal window with the connection selector.
  return <>{props.children}</>;
};
