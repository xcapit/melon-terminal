import React, { useMemo } from 'react';
import Web3 from 'web3';
import { hot } from 'react-hot-loader';
import { Reset } from 'styled-reset';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createSchema, createSchemaLink } from '../graphql';
import { Home } from './Home';
import { Playground } from './Playground';
import { EthereumProviderSelector, useEthereumProvider } from './EthereumProvider';

const useApollo = (provider?: any) => {
  const client = useMemo(() => {
    return provider && new Web3(provider, undefined, {
      transactionConfirmationBlocks: 1,
    });
  }, [provider]);

  const schema = useMemo(() => createSchema(), []);
  const apollo = useMemo(() => {
    const link = createSchemaLink({
      schema,
      context: () => ({
        client,
      }),
    });

    const cache = new InMemoryCache({
      // TODO: Add fragment matcher.
    });

    return new ApolloClient({
      link,
      cache,
    });
  }, [schema, client]);

  return apollo;
};

const AppComponent = () => {
  const [provider, type, setType] = useEthereumProvider();
  const client = useApollo(provider);

  return (
    <>
      <Reset />
      <EthereumProviderSelector type={type} setType={setType} />
      <ApolloProvider client={client}>
        <Router>
          <Route path="/" exact={true} component={Home} />
          <Route path="/playground" component={Playground} />
        </Router>
      </ApolloProvider>
    </>
  );
};

export const App = hot(module)(AppComponent);