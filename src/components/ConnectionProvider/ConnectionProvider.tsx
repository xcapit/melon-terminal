import React, { useState, createContext, useMemo, useEffect } from 'react';
import Web3 from 'web3';
import ApolloClient from 'apollo-client';
import * as Rx from 'rxjs';
import * as R from 'ramda';
import { mapTo, map, skip, filter, switchMap, expand, distinctUntilChanged, combineLatest, shareReplay } from 'rxjs/operators';
import { useObservable } from 'rxjs-hooks';
import { ApolloProvider } from '@apollo/react-hooks';
import { createSchema, createSchemaLink } from '../../graphql';
import { ConnectionSelector } from './ConnectionSelector/ConnectionSelector';
import { HttpProvider } from 'web3-providers';
import { createHttpLink } from "apollo-link-http";
import { NormalizedCacheObject, InMemoryCache } from 'apollo-cache-inmemory';
import { Maybe } from '../../types';

// TODO: Fix this type.
export type ConnectionProvider = any;

export enum ConnectionProviderTypeEnum {
  'FRAME' = 'FRAME',
  'INJECTED' = 'INJECTED',
  'KOVAN' = 'KOVAN',
  'MAINNET' = 'MAINNET',
};

export interface Connection {
  client: Web3;
  network?: number;
  accounts?: string[];
}

interface ConnectionProviderResource extends Rx.Unsubscribable {
  client: Web3;
}

export const TheGraphContext = createContext<Maybe<ApolloClient<NormalizedCacheObject>>>(undefined);

const checkConnection = async (client: Web3) => {
  const [network, accounts] = await Promise.all([
    client.eth.net.getId().catch((e) => console.log(e) as any || undefined),
    client.eth.getAccounts().catch(() => undefined),
  ]);

  return { client, network, accounts } as Connection;
};

const createConnection = (type: ConnectionProviderTypeEnum): Rx.Observable<Connection> => {
  switch (type) {
    case ConnectionProviderTypeEnum.FRAME: {
      const client$ = Rx.using(() => {
        const provider = new HttpProvider('http://localhost:1248');
        const client = new Web3(provider, undefined, {
          transactionConfirmationBlocks: 1,
        });

        return {
          client,
          unsubscribe: () => provider.disconnect(),
        };
      }, (resource) => Rx.of((resource as ConnectionProviderResource).client));

      // TODO: Check with frame.sh maintainers to see if there is an event that
      // we can subscribe to instead of polling.
      return client$.pipe(
        switchMap(client => checkConnection(client)),
        expand((connection) => Rx.timer(1000).pipe(switchMap(() => checkConnection(connection.client)))),
        distinctUntilChanged((a, b) => R.equals(a, b)),
      );
    }

    case ConnectionProviderTypeEnum.KOVAN: {
      const client$ = Rx.using(() => {
        const provider = new HttpProvider('https://kovan.infura.io/v3/8332aa03fcfa4c889aeee4d0e0628660');
        const client = new Web3(provider, undefined, {
          transactionConfirmationBlocks: 1,
        });

        return {
          client,
          unsubscribe: () => provider.disconnect(),
        };
      }, (resource) => Rx.of((resource as ConnectionProviderResource).client));

      return client$.pipe(switchMap(client => checkConnection(client)));
    }

    case ConnectionProviderTypeEnum.MAINNET: {
      const client$ = Rx.using(() => {
        const provider = new HttpProvider('https://mainnet.infura.io/v3/8332aa03fcfa4c889aeee4d0e0628660');
        const client = new Web3(provider, undefined, {
          transactionConfirmationBlocks: 1,
        });

        return {
          client,
          unsubscribe: () => provider.disconnect(),
        };
      }, (resource) => Rx.of((resource as ConnectionProviderResource).client));

      return client$.pipe(switchMap(client => checkConnection(client)));
    }

    case ConnectionProviderTypeEnum.INJECTED: {
      const ethereum = (window as any).ethereum;
      if (typeof ethereum === 'undefined') {
        return Rx.EMPTY;
      }

      ethereum.autoRefreshOnNetworkChange = false;
      const client = new Web3(ethereum, undefined, {
        transactionConfirmationBlocks: 1,
      });

      const enable$ = Rx.defer(() => ethereum.enable() as Promise<string[]>).pipe(shareReplay(1));
      const networkChange$ = Rx.fromEvent<string>(ethereum, 'networkChanged').pipe(map(value => parseInt(value, 10)));
      const network$ = Rx.concat(Rx.defer(() => client.eth.net.getId()), networkChange$);
      const accountsChanged$ = Rx.fromEvent<string[]>(ethereum, 'accountsChanged');
      const accounts$ = Rx.concat(enable$, accountsChanged$);

      return enable$.pipe(
        mapTo(client),
        combineLatest(network$, accounts$),
        map(([client, network, accounts]) => ({ client, network, accounts })),
      );
    }
  }

  throw new Error('Invalid provider type.');
}

const useLocalApollo = (connection: Maybe<Connection>) => {
  const client = connection && connection.client;
  const network = connection && connection.network;
  const accounts = connection && connection.accounts;

  const schema = useMemo(() => createSchema(), []);
  // eslint-disable-next-line
  const apollo = useMemo(() => {
    if (!(client && network)) {
      return;
    }

    const context = {
      web3: client,
    };

    const link = createSchemaLink({ schema, context });
    const cache = new InMemoryCache();
    return new ApolloClient({ link, cache });
  }, [client, network, schema]);

  useEffect(() => {
    apollo && apollo.resetStore();
  }, [apollo, network, accounts]);

  return apollo;
}

const useTheGraphApollo = (connection: Maybe<Connection>) => {
  const network = connection && connection.network;
  const apollo = useMemo(() => {
    const urls = {
      1: 'https://api.thegraph.com/subgraphs/name/melonproject/melon',
      42: 'https://api.thegraph.com/subgraphs/name/iherger/melon-ash-kovan',
    } as { [key: number]: string };

    if (!(network && urls[network])) {
      return;
    }

    const link = createHttpLink({ uri: urls[network] });
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
  const local = useLocalApollo(connection);
  const graph = useTheGraphApollo(connection);

  return (
    <>
      <ConnectionSelector current={provider} set={set} />
      {local && (
        <ApolloProvider client={local}>
          <TheGraphContext.Provider value={graph}>{props.children}</TheGraphContext.Provider>
        </ApolloProvider>)
      }
    </>
  );
};
