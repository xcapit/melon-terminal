import React, { useState, useMemo, useEffect, createContext, useRef } from 'react';
import * as Rx from 'rxjs';
import ApolloClient from 'apollo-client';
import { Eth } from 'web3-eth';
import { switchAll, pluck } from 'rxjs/operators';
import { ApolloLink } from 'apollo-link';
import { HttpProvider } from 'web3-providers';
import { onError } from 'apollo-link-error';
import { createHttpLink } from 'apollo-link-http';
import { useObservable } from 'rxjs-hooks';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { createSchemaLink, createSchema, createQueryContext } from '~/graphql';
import { NetworkEnum } from '~/types';
import { ApolloProvider } from '@apollo/react-hooks';
import { Environment, Address } from '@melonproject/melonjs';
import LRUCache from 'lru-cache';

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
  provider: ConnectionProviderTypeEnum;
  network?: NetworkEnum;
  accounts?: Address[];
}

export interface ApolloProviderContext {
  client: ApolloClient<NormalizedCacheObject>;
}

export interface OnChainContextValue extends ApolloProviderContext {
  set: (observable: Rx.Observable<Connection>) => void;
  connection: Connection;
  environment: Environment;
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

const useOnChainApollo = (connection: Connection, environment: Environment) => {
  const schema = useMemo(() => createSchema(), []);
  const apollo = useMemo(() => {
    const context = createQueryContext(connection, environment);
    const data = createSchemaLink({ schema, context });
    const error = createErrorLink();
    const link = ApolloLink.from([error, data]);
    const memory = new InMemoryCache({
      addTypename: true,
    });

    return new ApolloClient({
      link,
      cache: memory,
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
  }, [connection, schema]);

  const apolloRef = useRef<ApolloClient<NormalizedCacheObject>>();
  useEffect(
    () => () => {
      apolloRef.current && apolloRef.current.stop();
      apolloRef.current && apolloRef.current.cache.reset();
      apolloRef.current = apollo;
    },
    [apollo]
  );

  return apollo;
};

export const ConnectionProvider: React.FC = props => {
  const infura = useMemo<Connection>(() => {
    const network = process.env.NETWORK;
    const provider = ConnectionProviderTypeEnum.DEFAULT;
    const http = new HttpProvider(`https://${network.toLowerCase()}.infura.io/v3/8332aa03fcfa4c889aeee4d0e0628660`);
    const eth = new Eth(http, undefined, {
      transactionConfirmationBlocks: 1,
    });

    return { provider, eth, network, accounts: [] };
  }, []);

  const [observable, set] = useState<Rx.Observable<Connection>>(Rx.EMPTY);
  const connection = useObservable<Connection, [Rx.Observable<Connection>]>(
    inputs$ => {
      const output$ = inputs$.pipe(
        pluck(0),
        switchAll()
      );

      return output$;
    },
    infura,
    [observable]
  );

  const environment = useMemo(() => {
    return new Environment(connection.eth, {
      cache: new LRUCache<string, any>(),
    });
  }, [connection]);

  const client = useOnChainApollo(connection, environment);

  return (
    <OnChainContext.Provider value={{ client, connection, environment, set }}>
      <ApolloProvider client={client}>{props.children}</ApolloProvider>
    </OnChainContext.Provider>
  );
};

export const RequireSecureConnection: React.FC = props => {
  // TODO: Render a modal window with the connection selector.
  return <>{props.children}</>;
};
