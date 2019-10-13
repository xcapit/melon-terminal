import React, { useContext } from 'react';
import * as Rx from 'rxjs';
import { take } from 'rxjs/operators';
import { useLocation, useHistory } from 'react-router';
import { ConnectionProviderTypeEnum, OnChainContext, Connection } from '~/components/Contexts/Connection';
import { MetaMask } from './MetaMask/MetaMask';
import { CustomRpc } from './CustomRpc/CustomRpc';
import { Frame } from './Frame/Frame';
import * as S from './ConnectionSelector.styles';

export interface ConnectionMethodProps {
  active: boolean;
  set: (connection: Rx.Observable<Connection>) => void;
}

export const ConnectionSelector: React.FC = () => {
  const context = useContext(OnChainContext);
  const history = useHistory();
  const location = useLocation();
  const set = (provider: ConnectionProviderTypeEnum, connection: Rx.Observable<Connection>) => {
    connection.pipe(take(1)).subscribe(() => {
      if (location.state && location.state.redirect) {
        history.replace(location.state.redirect);
      } else {
        history.push('/');
      }
    });

    context.set(provider, connection);
  };

  return (
    <>
      <S.Method>
        <MetaMask
          active={context.provider === ConnectionProviderTypeEnum.METAMASK}
          set={connection => set(ConnectionProviderTypeEnum.METAMASK, connection)}
        />
      </S.Method>

      <S.Method>
        <Frame
          active={context.provider === ConnectionProviderTypeEnum.FRAME}
          set={connection => set(ConnectionProviderTypeEnum.FRAME, connection)}
        />
      </S.Method>

      <S.Method>
        <CustomRpc
          active={context.provider === ConnectionProviderTypeEnum.CUSTOM}
          set={connection => set(ConnectionProviderTypeEnum.CUSTOM, connection)}
        />
      </S.Method>
    </>
  );
};
