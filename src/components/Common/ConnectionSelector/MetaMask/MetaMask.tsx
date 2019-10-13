import React from 'react';
import * as Rx from 'rxjs';
import { mapTo, map, combineLatest, share } from 'rxjs/operators';
import { Eth } from 'web3-eth';
import { Connection } from '~/components/Contexts/Connection';
import { ConnectionMethodProps } from '~/components/Common/ConnectionSelector/ConnectionSelector';

const connect = (): Rx.Observable<Connection> => {
  const ethereum = (window as any).ethereum;
  if (typeof ethereum === 'undefined') {
    return Rx.EMPTY;
  }

  ethereum.autoRefreshOnNetworkChange = false;
  const eth = new Eth(ethereum, undefined, {
    transactionConfirmationBlocks: 1,
  });

  const enable$ = Rx.defer(() => ethereum.enable() as Promise<string[]>).pipe(share());
  const networkChange$ = Rx.fromEvent<string>(ethereum, 'networkChanged').pipe(map(value => parseInt(value, 10)));
  const network$ = Rx.concat(Rx.defer(() => eth.net.getId()), networkChange$);
  const accountsChanged$ = Rx.fromEvent<string[]>(ethereum, 'accountsChanged');
  const accounts$ = Rx.concat(enable$, accountsChanged$);

  return enable$.pipe(
    mapTo(eth),
    combineLatest(network$, accounts$),
    map(([eth, network, accounts]) => ({ eth, network, accounts } as Connection))
  );
};

export const MetaMask: React.FC<ConnectionMethodProps> = ({ set, active }) => {
  const handleClick = () => {
    set(connect());
  };

  return (
    <div>
      <h2>Metamask</h2>
      {!active && <button onClick={handleClick}>Connect</button>}
    </div>
  );
};
