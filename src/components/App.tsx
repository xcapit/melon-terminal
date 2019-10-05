import React, { Suspense } from 'react';
import { hot } from 'react-hot-loader';
import { Reset } from 'styled-reset';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ConnectionProvider, TheGraphContext, OnChainContext } from './ConnectionProvider/ConnectionProvider';
import { ErrorBoundary } from './ErrorBoundary/ErrorBoundary';
import { Throbber } from './Throbber/Throbber';

const Playground = React.lazy(() => import('./Routes/Playground/Playground'));
const Home = React.lazy(() => import('./Routes/Home/Home'));
const Fund = React.lazy(() => import('./Routes/Fund/Fund'));
const NoMatch = React.lazy(() => import('./Routes/NoMatch/NoMatch'));

const AppComponent = () => {
  return (
    <>
      <Reset />
      <Router>
        <ErrorBoundary>
          <Suspense fallback={<Throbber />}>
            <ConnectionProvider>
              <Switch>
                <Route path="/" exact={true} component={Home} />
                <Route path="/fund/:address" component={Fund} />
                <Route path="/playground/onchain" render={props => <Playground {...props} context={OnChainContext} />} />
                <Route path="/playground/thegraph" render={props => <Playground {...props} context={TheGraphContext} />} />
                <Route component={NoMatch} />
              </Switch>
            </ConnectionProvider>
          </Suspense>
        </ErrorBoundary>
      </Router>
    </>
  );
};

export const App = hot(module)(AppComponent);
