import React, { useContext, useState } from 'react';
import * as Rx from 'rxjs';
import { take, map } from 'rxjs/operators';
import { useLocation, useHistory } from 'react-router';
import { ConnectionProviderTypeEnum, OnChainContext, Connection } from '~/components/Contexts/Connection';
import { MetaMask } from './MetaMask/MetaMask';
import { CustomRpc } from './CustomRpc/CustomRpc';
import { Frame } from './Frame/Frame';
import * as S from './ConnectionSelector.styles';

export type AnonymousConnection = Omit<Connection, 'provider'>;
export interface ConnectionMethodProps {
  active: boolean;
  busy: boolean;
  set: (connection: Rx.Observable<AnonymousConnection>) => void;
}

export const ConnectionSelector: React.FC = () => {
  const context = useContext(OnChainContext);
  const history = useHistory();
  const location = useLocation();

  const [connecting, setConnecting] = useState<boolean>(false);
  const set = (provider: ConnectionProviderTypeEnum, connection: Rx.Observable<AnonymousConnection>) => {
    setConnecting(true);

    connection.pipe(take(1)).subscribe(
      () => {
        context.set(connection.pipe(map(value => ({ ...value, provider } as Connection))));

        if (location.state && location.state.redirect) {
          history.replace(location.state.redirect);
        } else {
          history.push('/');
        }
      },
      () => setConnecting(false)
    );
  };

  return (
    <>
      <S.Method>
        <MetaMask
          busy={connecting}
          active={context.connection.provider === ConnectionProviderTypeEnum.METAMASK}
          set={connection => set(ConnectionProviderTypeEnum.METAMASK, connection)}
        />
      </S.Method>

      <S.Method>
        <Frame
          busy={connecting}
          active={context.connection.provider === ConnectionProviderTypeEnum.FRAME}
          set={connection => set(ConnectionProviderTypeEnum.FRAME, connection)}
        />
      </S.Method>

      <S.Method>
        <CustomRpc
          busy={connecting}
          active={context.connection.provider === ConnectionProviderTypeEnum.CUSTOM}
          set={connection => set(ConnectionProviderTypeEnum.CUSTOM, connection)}
        />
      </S.Method>
    </>
  );
};
