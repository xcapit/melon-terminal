import React, { useState } from 'react';
import * as Rx from 'rxjs';
import * as R from 'ramda';
import { switchMap, expand, distinctUntilChanged } from 'rxjs/operators';
import { Eth } from 'web3-eth';
import { HttpProvider } from 'web3-providers';
import { Connection, ConnectionProviderResource, checkConnection } from '~/components/Contexts/Connection';
import { ConnectionMethodProps } from '~/components/Common/ConnectionSelector/ConnectionSelector';

const connect = (endpoint: string): Rx.Observable<Connection> => {
  const eth$ = Rx.using(
    () => {
      const provider = new HttpProvider(endpoint);
      const eth = new Eth(provider, undefined, {
        transactionConfirmationBlocks: 1,
      });

      return {
        eth,
        unsubscribe: () => provider.disconnect(),
      };
    },
    resource => Rx.of((resource as ConnectionProviderResource).eth)
  );

  return eth$.pipe(
    switchMap(eth => checkConnection(eth)),
    expand(connection => Rx.timer(10000).pipe(switchMap(() => checkConnection(connection.eth)))),
    distinctUntilChanged((a, b) => R.equals(a, b))
  );
};

export const CustomRpc: React.FC<ConnectionMethodProps> = ({ set, active }) => {
  const [endpoint, setEndpoint] = useState('https://mainnet.infura.io/v3/8332aa03fcfa4c889aeee4d0e0628660');
  const handleClick = () => {
    set(connect(endpoint));
  };

  return (
    <div>
      <h2>Custom endpoint</h2>
      <input type="text" onChange={e => setEndpoint(e.target.value)} value={endpoint} />
      {!active && <button onClick={handleClick}>Connect</button>}
    </div>
  );
};
