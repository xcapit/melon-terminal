import React, { useState, createContext } from 'react';
import Web3 from 'web3';
import * as Rx from 'rxjs';
import { mapTo, map, delayWhen, delay, retryWhen, tap, skip, filter, switchMap } from 'rxjs/operators';
import { useObservable } from 'rxjs-hooks';
import { ApolloProvider } from '@apollo/react-hooks';
import { useApollo } from '../../graphql';
import { ConnectionSelector } from './ConnectionSelector/ConnectionSelector';
import { HttpProvider } from 'web3-providers';
import { createHttpLink } from "apollo-link-http";
import { NormalizedCacheObject, InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { Maybe } from '../../types';

// TODO: Fix this type.
export type ConnectionProvider = any;

export enum ConnectionProviderTypeEnum {
  'FRAME' = 'FRAME',
  'INJECTED' = 'INJECTED',
  'KOVAN' = 'KOVAN',
  'MAINNET' = 'MAINNET',
};

const createProvider = (type: ConnectionProviderTypeEnum) => {
  switch (type) {
    case ConnectionProviderTypeEnum.FRAME: {
      return new HttpProvider('http://localhost:1248');
    }

    case ConnectionProviderTypeEnum.KOVAN: {
      return new HttpProvider('https://kovan.infura.io/v3/8332aa03fcfa4c889aeee4d0e0628660');
    }

    case ConnectionProviderTypeEnum.MAINNET: {
      return new HttpProvider('https://mainnet.infura.io/v3/8332aa03fcfa4c889aeee4d0e0628660');
    }

    case ConnectionProviderTypeEnum.INJECTED: {
      if ((window as any).ethereum) {
        (window as any).ethereum.enable();
        return (window as any).ethereum as ConnectionProvider;
      }

      if ((window as any).web3 && (window as any).web3.currentProvider) {
        return (window as any).web3.currentProvider as ConnectionProvider;
      }

      throw new Error('Missing injected provider.');
    }
  }

  throw new Error('Invalid provider type.');
};

const useConnection = () => {
  const [type, set] = useState<Maybe<ConnectionProviderTypeEnum>>(undefined);
  const connection = useObservable<Maybe<Web3>, [Maybe<ConnectionProviderTypeEnum>]>((input$) => {
    const reset$ = input$.pipe(mapTo(undefined), skip(1));
    const connection$ = input$.pipe(
      map(([type]) => type),
      filter((type): type is ConnectionProviderTypeEnum => !!type),
      map((type) => createProvider(type)),
      map((provider) => new Web3(provider, undefined, {
        transactionConfirmationBlocks: 1,
      })),
      // TODO: If we need more fine grained per-provider logic for connection
      // validation, we can simply move this logic into createProvider().
      delayWhen((client) => Rx.from(client.eth.getAccounts())),
      tap(() => console.log('Successfully connected.')),
      retryWhen(source => source.pipe(tap((error) => console.log('Failed to connect. Retrying.', error)), delay(1000))),
    );

    return Rx.merge(reset$, connection$);
  }, undefined, [type]);

  const network = useObservable<Maybe<string>, [Maybe<Web3>]>((input$) => input$.pipe(
    map(([connection]) => connection),
    filter((connection): connection is Web3 => !!connection),
    switchMap(connection => connection.eth.net.getNetworkType())
  ), undefined, [connection]);

  const apollo = useApollo(connection);
  return [apollo, network, type, set] as [typeof apollo, typeof network, typeof type, typeof set];
};

export const TheGraphContext = createContext<Maybe<ApolloClient<NormalizedCacheObject>>>(undefined);
const useTheGraph = (network: Maybe<string>) => {
  const urls = {
    main: 'https://api.thegraph.com/subgraphs/name/melonproject/melon',
    kovan: 'https://api.thegraph.com/subgraphs/name/iherger/melon-ash-kovan',
  } as { [key: string]: string }

  if (!network || !urls[network]) {
    return;
  }

  const link = createHttpLink({
    uri: urls[network],
  });

  const cache = new InMemoryCache();
  return new ApolloClient({
    link,
    cache,
  });
};

export const ConnectionProvider: React.FC = (props) => {
  const [apollo, network, provider, set] = useConnection();
  const graph = useTheGraph(network);

  return (
    <>
      <ConnectionSelector current={provider} set={set} />
      {apollo && (
        <ApolloProvider client={apollo}>
          <TheGraphContext.Provider value={graph}>{props.children}</TheGraphContext.Provider>
        </ApolloProvider>)
      }
    </>
  );
};
