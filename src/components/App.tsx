import React, { Suspense } from 'react';
import { hot } from 'react-hot-loader';
import { Reset } from 'styled-reset';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ConnectionProvider } from './ConnectionProvider/ConnectionProvider';

const Playground = React.lazy(() => import('./Playground'));
const Home = React.lazy(() => import('./Home'));

const AppComponent = () => {
  return (
    <>
      <Reset />
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <ConnectionProvider>
            <Switch>
              <Route path="/" exact={true} component={Home} />
              <Route path="/playground" component={Playground} />
            </Switch>
          </ConnectionProvider>
        </Suspense>
      </Router>
    </>
  );
};

export const App = hot(module)(AppComponent);