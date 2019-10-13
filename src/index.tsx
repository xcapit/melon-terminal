import React from 'react';
import ReactDOM from 'react-dom';
import { App } from '~/components/App';

const ethereum = (window as any).ethereum;
if (typeof ethereum !== 'undefined') {
  ethereum.autoRefreshOnNetworkChange = false;
}

ReactDOM.render(<App />, document.getElementById('root'));
