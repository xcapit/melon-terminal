import React from 'react';
import * as Rx from 'rxjs';
import * as R from 'ramda';
import { switchMap, expand, distinctUntilChanged } from 'rxjs/operators';
import { Eth } from 'web3-eth';
import { HttpProvider } from 'web3-providers';
import { Connection, checkConnection, ConnectionProviderResource } from '~/components/Contexts/Connection';
import { ConnectionMethodProps } from '~/components/Common/ConnectionSelector/ConnectionSelector';

const connect = (): Rx.Observable<Connection> => {
  const eth$ = Rx.using(
    () => {
      const provider = new HttpProvider('http://localhost:1248');
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

  // TODO: Check with frame.sh maintainers to see if there is an event that
  // we can subscribe to instead of polling.
  return eth$.pipe(
    switchMap(eth => checkConnection(eth)),
    expand(connection => Rx.timer(10000).pipe(switchMap(() => checkConnection(connection.eth)))),
    distinctUntilChanged((a, b) => R.equals(a, b))
  );
};

export const Frame: React.FC<ConnectionMethodProps> = ({ set, active }) => {
  return (
    <div>
      <h2>Frame</h2>
      {!active && <button onClick={() => set(connect())}>Connect</button>}
    </div>
  );
};
