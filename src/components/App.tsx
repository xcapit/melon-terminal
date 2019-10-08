import React, { Suspense, useContext } from 'react';
import ErrorBoundary, { FallbackProps } from 'react-error-boundary';
import { hot } from 'react-hot-loader';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router';
import { ConnectionProvider, TheGraphContext, OnChainContext, ConnectionContext } from './Contexts/Connection';
import { Spinner } from './Common/Spinner/Spinner';
import { Layout } from './Layout/Layout';
import { Theme } from './App.styles';

const Home = React.lazy(() => import('./Routes/Home/Home'));
const Fund = React.lazy(() => import('./Routes/Fund/Fund'));
const Connect = React.lazy(() => import('./Routes/Connect/Connect'));
const Playground = React.lazy(() => import('./Routes/Playground/Playground'));
const NoMatch = React.lazy(() => import('./Routes/NoMatch/NoMatch'));

const AppRouter = () => {
  const history = useHistory();
  const location = useLocation();
  const { connection, provider } = useContext(ConnectionContext);

  if (!provider && location.pathname !== '/connect') {
    history.replace({
      pathname: '/connect',
      state: {
        redirect: location,
      },
    });

    return null;
  }

  if (!connection && location.pathname !== '/connect') {
    return <Spinner positioning="overlay" size="large" />;
  }

  return (
    <Switch>
      <Route path="/" exact={true}>
        <Home />
      </Route>
      <Route path="/connect" exact={true}>
        <Connect />
      </Route>
      <Route path="/fund/:address">
        <Fund />
      </Route>
      <Route path="/playground/onchain" exact={true}>
        <Playground context={OnChainContext} />
      </Route>
      <Route path="/playground/thegraph" exact={true}>
        <Playground context={TheGraphContext} />
      </Route>
      <Route>
        <NoMatch />
      </Route>
    </Switch>
  );
};

const AppComponent = () => (
  <Theme>
    <ConnectionProvider>
      <Router>
        <Layout>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<Spinner size="large" positioning="overlay" />}>
              <AppRouter />
            </Suspense>
          </ErrorBoundary>
        </Layout>
      </Router>
    </ConnectionProvider>
  </Theme>
);

const ErrorFallback: React.FC<FallbackProps> = ({ error, componentStack }) => (
  <div>
    <p>
      <strong>Oops! An error occured!</strong>
    </p>
    <p>Here’s what we know…</p>
    {error && (
      <p>
        <strong>Error:</strong> {error.toString()}
      </p>
    )}
    {componentStack && (
      <p>
        <strong>Stacktrace:</strong> {componentStack}
      </p>
    )}
  </div>
);

export const App = hot(module)(AppComponent);
