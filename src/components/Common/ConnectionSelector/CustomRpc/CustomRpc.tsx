import React, { useState } from 'react';
import * as Rx from 'rxjs';
import * as R from 'ramda';
import { switchMap, expand, distinctUntilChanged } from 'rxjs/operators';
import { Eth } from 'web3-eth';
import { HttpProvider } from 'web3-providers';
import { ConnectionMethodProps, AnonymousConnection } from '~/components/Common/ConnectionSelector/ConnectionSelector';
import { networkFromId } from '~/utils/networkFromId';

interface EthResource extends Rx.Unsubscribable {
  eth: Eth;
}

const checkConnection = async (eth: Eth) => {
  const [id, accounts] = await Promise.all([
    eth.net.getId().catch(() => undefined),
    eth.getAccounts().catch(() => undefined),
  ]);

  const network = id && networkFromId(id);
  return { eth, network, accounts } as AnonymousConnection;
};

const connect = (endpoint: string): Rx.Observable<AnonymousConnection> => {
  const createResource = (): EthResource => {
    const http = new HttpProvider(endpoint);
    const eth = new Eth(http, undefined, {
      transactionConfirmationBlocks: 1,
    });

    return {
      eth,
      unsubscribe: () => http.disconnect(),
    };
  };

  return Rx.using(createResource, resource => {
    return Rx.of((resource as EthResource).eth).pipe(
      switchMap(eth => checkConnection(eth)),
      expand(connection => Rx.timer(10000).pipe(switchMap(() => checkConnection(connection.eth)))),
      distinctUntilChanged((a, b) => R.equals(a, b))
    );
  });
};

export const CustomRpc: React.FC<ConnectionMethodProps> = ({ set, active }) => {
  const [endpoint, setEndpoint] = useState('https://mainnet.infura.io/v3/8332aa03fcfa4c889aeee4d0e0628660');

  return (
    <div>
      <h2>Custom endpoint</h2>
      <input type="text" onChange={e => setEndpoint(e.target.value)} value={endpoint} />
      {!active && <button onClick={() => set(connect(endpoint))}>Connect</button>}
    </div>
  );
};
