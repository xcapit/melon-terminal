import React from 'react';
import { hot } from 'react-hot-loader';
import { Reset } from 'styled-reset';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ConnectionProvider } from './ConnectionProvider/ConnectionProvider';
import { Home } from './Home';
import { Playground } from './Playground';
import { Graph } from './Graph';

const AppComponent = () => {
  return (
    <>
      <Reset />
      <Router>
        <ConnectionProvider>
          <Route path="/" exact={true} component={Home} />
          <Route path="/graph" component={Graph} />
          <Route path="/playground" component={Playground} />
        </ConnectionProvider>
      </Router>
    </>
  );
};

export const App = hot(module)(AppComponent);