import React, { useMemo } from 'react';
import { hot } from 'react-hot-loader';
import { Eth } from 'web3-eth';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createSchema, createSchemaLink } from '../graphql';
import { Home } from './Home';
import { Playground } from './Playground';

const useMetamask = () => {
  const metamask = useMemo(() => {
    const injected = (window as any).web3;
    if (typeof injected !== 'undefined' && injected.currentProvider && injected.currentProvider.isMetaMask) {
      return new Eth(injected.currentProvider);
    };
  }, []);

  return metamask;
};

const useApollo = () => {
  const metamask = useMetamask();
  const schema = useMemo(() => createSchema(), []);
  const apollo = useMemo(() => {
    const link = createSchemaLink({
      schema,
      context: () => ({
        client: metamask,
      }),
    });

    const cache = new InMemoryCache({
      // TODO: Add fragment matcher.
    });

    return new ApolloClient({
      link,
      cache,
    });
  }, [schema, metamask]);

  return apollo;
};

const AppComponent = () => {
  const client = useApollo();

  return (
    <ApolloProvider client={client}>
      <Router>
        <Route path="/" exact={true} component={Home} />
        <Route path="/playground" component={Playground} />
      </Router>
    </ApolloProvider>
  );
};

export const App = hot(module)(AppComponent);