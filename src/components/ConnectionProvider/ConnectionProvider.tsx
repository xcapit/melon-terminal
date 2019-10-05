import React, { useState, createContext, useMemo, useEffect } from 'react';
import ApolloClient from 'apollo-client';
import * as Rx from 'rxjs';
import * as R from 'ramda';
import { Eth } from 'web3-eth';
import { mapTo, map, skip, filter, switchMap, expand, distinctUntilChanged, combineLatest, shareReplay } from 'rxjs/operators';
import { useObservable } from 'rxjs-hooks';
import { ApolloLink } from 'apollo-link';
import { HttpProvider } from 'web3-providers';
import { onError } from 'apollo-link-error';
import { createHttpLink } from "apollo-link-http";
import { NormalizedCacheObject, InMemoryCache } from 'apollo-cache-inmemory';
import { ConnectionSelector } from './ConnectionSelector/ConnectionSelector';
import { createSchemaLink, createSchema, createQueryContext } from '../../graphql';
import { Maybe } from '../../types';

// TODO: Fix this type.
export type ConnectionProvider = any;

export enum ConnectionProviderTypeEnum {
  'FRAME' = 'FRAME',
  'INJECTED' = 'INJECTED',
  'CUSTOM' = 'CUSTOM',
};

export interface Connection {
  eth: Eth;
  network?: number;
  accounts?: string[];
}

interface ConnectionProviderResource extends Rx.Unsubscribable {
  eth: Eth;
}

export const TheGraphContext = createContext<Maybe<ApolloClient<NormalizedCacheObject>>>(undefined);
export const OnChainContext = createContext<Maybe<ApolloClient<NormalizedCacheObject>>>(undefined);

const checkConnection = async (eth: Eth) => {
  const [network, accounts] = await Promise.all([
    eth.net.getId().catch(() => undefined),
    eth.getAccounts().catch(() => undefined),
  ]);

  return { eth, network, accounts } as Connection;
};

const createConnection = (type: ConnectionProviderTypeEnum): Rx.Observable<Connection> => {
  switch (type) {
    case ConnectionProviderTypeEnum.FRAME: {
      const eth$ = Rx.using(() => {
        const provider = new HttpProvider('http://localhost:1248');
        const eth = new Eth(provider, undefined, {
          transactionConfirmationBlocks: 1,
        });

        return {
          eth,
          unsubscribe: () => provider.disconnect(),
        };
      }, (resource) => Rx.of((resource as ConnectionProviderResource).eth));

      // TODO: Check with frame.sh maintainers to see if there is an event that
      // we can subscribe to instead of polling.
      return eth$.pipe(
        switchMap(eth => checkConnection(eth)),
        expand((connection) => Rx.timer(1000).pipe(switchMap(() => checkConnection(connection.eth)))),
        distinctUntilChanged((a, b) => R.equals(a, b)),
      );
    }

    case ConnectionProviderTypeEnum.CUSTOM: {
      const eth$ = Rx.using(() => {
        const provider = new HttpProvider('https://mainnet.infura.io/v3/8332aa03fcfa4c889aeee4d0e0628660');
        const eth = new Eth(provider, undefined, {
          transactionConfirmationBlocks: 1,
        });

        return {
          eth,
          unsubscribe: () => provider.disconnect(),
        };
      }, (resource) => Rx.of((resource as ConnectionProviderResource).eth));

      return eth$.pipe(switchMap(eth => checkConnection(eth)));
    }

    case ConnectionProviderTypeEnum.INJECTED: {
      const ethereum = (window as any).ethereum;
      if (typeof ethereum === 'undefined') {
        return Rx.EMPTY;
      }

      ethereum.autoRefreshOnNetworkChange = false;
      const eth = new Eth(ethereum, undefined, {
        transactionConfirmationBlocks: 1,
      });

      const enable$ = Rx.defer(() => ethereum.enable() as Promise<string[]>).pipe(shareReplay(1));
      const networkChange$ = Rx.fromEvent<string>(ethereum, 'networkChanged').pipe(map(value => parseInt(value, 10)));
      const network$ = Rx.concat(Rx.defer(() => eth.net.getId()), networkChange$);
      const accountsChanged$ = Rx.fromEvent<string[]>(ethereum, 'accountsChanged');
      const accounts$ = Rx.concat(enable$, accountsChanged$);

      return enable$.pipe(
        mapTo(eth),
        combineLatest(network$, accounts$),
        map(([eth, network, accounts]) => ({ eth, network, accounts })),
      );
    }
  }

  throw new Error('Invalid provider type.');
}

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

const useOnChainApollo = (connection: Maybe<Connection>) => {
  const eth = connection && connection.eth;
  const network = connection && connection.network;
  const accounts = connection && connection.accounts;

  const schema = useMemo(() => createSchema(), []);
  const apollo = useMemo(() => {
    if (!(eth && network)) {
      return;
    }

    const context = createQueryContext(eth, network);
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
  }, [eth, network, schema]);

  useEffect(() => {
    apollo && apollo.resetStore();
  }, [apollo, network, accounts]);

  return apollo;
}

const useTheGraphApollo = (connection: Maybe<Connection>) => {
  const network = connection && connection.network;
  const apollo = useMemo(() => {
    if (!(network && network === 1)) {
      return;
    }

    const uri = 'https://api.thegraph.com/subgraphs/name/melonproject/melon';
    const link = createHttpLink({ uri });
    const cache = new InMemoryCache();
    return new ApolloClient({ link, cache });
  }, [network]);

  return apollo;
};

const useConnection = () => {
  const [type, set] = useState<Maybe<ConnectionProviderTypeEnum>>(undefined);
  const connection = useObservable<Maybe<Connection>, [Maybe<ConnectionProviderTypeEnum>]>((input$) => {
    const reset$ = input$.pipe(mapTo(undefined), skip(1));
    const connection$ = input$.pipe(
      map(([type]) => type),
      filter((type): type is ConnectionProviderTypeEnum => !!type),
      switchMap((type) => createConnection(type)),
    );

    return Rx.merge(reset$, connection$);
  }, undefined, [type]);

  return [connection, type, set] as [typeof connection, typeof type, typeof set];
};

export const ConnectionProvider: React.FC = (props) => {
  const [connection, provider, set] = useConnection();
  const onChainClient = useOnChainApollo(connection);
  const theGraphClient = useTheGraphApollo(connection);

  return (
    <>
      {!onChainClient && (
        <ConnectionSelector current={provider} set={set} />
      )}

      {onChainClient && (
        <OnChainContext.Provider value={onChainClient}>
          <TheGraphContext.Provider value={theGraphClient}>{props.children}</TheGraphContext.Provider>
        </OnChainContext.Provider>
      )}
    </>
  );
};
