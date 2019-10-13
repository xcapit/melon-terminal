import React, { useState, useMemo, useEffect, createContext } from 'react';
import ApolloClient from 'apollo-client';
import * as Rx from 'rxjs';
import * as R from 'ramda';
import { Eth } from 'web3-eth';
import { mapTo, map, switchMap, expand, distinctUntilChanged, combineLatest, shareReplay, tap } from 'rxjs/operators';
import { ApolloLink } from 'apollo-link';
import { HttpProvider } from 'web3-providers';
import { onError } from 'apollo-link-error';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { createSchemaLink, createSchema, createQueryContext } from '~/graphql/setup';
import { ApolloProvider } from '@apollo/react-hooks';

const ethereum = (window as any).ethereum;
ethereum.autoRefreshOnNetworkChange = false;

// TODO: Fix this type.
export type ConnectionProvider = any;

export enum ConnectionProviderTypeEnum {
  'DEFAULT' = 'DEFAULT',
  'FRAME' = 'FRAME',
  'INJECTED' = 'INJECTED',
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
  set: React.Dispatch<React.SetStateAction<ConnectionProviderTypeEnum>>;
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
      const eth$ = Rx.using(
        () => {
          const provider = new HttpProvider('http://localhost:1248');
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

      // TODO: Check with frame.sh maintainers to see if there is an event that
      // we can subscribe to instead of polling.
      return eth$.pipe(
        switchMap(eth => checkConnection(eth)),
        expand(connection => Rx.timer(1000).pipe(switchMap(() => checkConnection(connection.eth)))),
        distinctUntilChanged((a, b) => R.equals(a, b))
      );
    }

    case ConnectionProviderTypeEnum.CUSTOM: {
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

      return eth$.pipe(switchMap(eth => checkConnection(eth)));
    }

    case ConnectionProviderTypeEnum.INJECTED: {
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
        map(([eth, network, accounts]) => ({ eth, network, accounts }))
      );
    }
  }

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
    expand(connection => Rx.timer(1000).pipe(switchMap(() => checkConnection(connection.eth)))),
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

const useConnection = () => {
  const [type, set] = useState<ConnectionProviderTypeEnum>(ConnectionProviderTypeEnum.DEFAULT);
  const subject = useMemo(() => new Rx.Subject<ConnectionProviderTypeEnum>(), undefined);
  const connection = useMemo(
    () =>
      subject.pipe(
        switchMap(type => createConnection(type)),
        shareReplay(1)
      ),
    [subject]
  );

  useEffect(() => subject.next(type), [subject, type]);

  return [connection, type, set] as [typeof connection, typeof type, typeof set];
};

export const ConnectionProvider: React.FC = props => {
  const [connection, provider, set] = useConnection();
  const client = useOnChainApollo(connection);

  return (
    <OnChainContext.Provider value={{ client, provider, set }}>
      <ApolloProvider client={client}>{props.children}</ApolloProvider>
    </OnChainContext.Provider>
  );
};

export const RequireSecureConnection: React.FC = props => {
  // const history = useHistory();
  // const location = useLocation();
  // const { connection, provider } = useContext(OnChainContext);

  // // if (!provider && location.pathname !== '/connect') {
  // //   history.replace({
  // //     pathname: '/connect',
  // //     state: {
  // //       redirect: location,
  // //     },
  // //   });

  // //   return null;
  // // }

  // if (!connection && location.pathname !== '/connect') {
  //   return <Spinner positioning="overlay" size="large" />;
  // }

  return <>{props.children}</>;
};
