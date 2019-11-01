import React, { useContext } from 'react';
import * as Rx from 'rxjs';
import { useLocation, useHistory } from 'react-router';
import { ConnectionProviderEnum, OnChainContext } from '~/components/Contexts/Connection';
import { MetaMask } from './MetaMask/MetaMask';
import { CustomRpc } from './CustomRpc/CustomRpc';
import { Frame } from './Frame/Frame';
import * as S from './ConnectionSelector.styles';
import { Environment } from '~/Environment';

export interface ConnectionMethodProps {
  active: boolean;
  set: (connection: Rx.Observable<Environment>) => void;
}

export const ConnectionSelector: React.FC = () => {
  const context = useContext(OnChainContext);
  const history = useHistory();
  const location = useLocation();

  const set = (provider: ConnectionProviderEnum, connection: Rx.Observable<Environment>) => {
    context.set(provider, connection);

    if (location.state && location.state.redirect) {
      history.replace(location.state.redirect);
    } else {
      history.push('/');
    }
  };

  return (
    <>
      <S.Method>
        <MetaMask
          active={context.provider === ConnectionProviderEnum.METAMASK}
          set={connection => set(ConnectionProviderEnum.METAMASK, connection)}
        />
      </S.Method>

      <S.Method>
        <Frame
          active={context.provider === ConnectionProviderEnum.FRAME}
          set={connection => set(ConnectionProviderEnum.FRAME, connection)}
        />
      </S.Method>

      <S.Method>
        <CustomRpc
          active={context.provider === ConnectionProviderEnum.CUSTOM}
          set={connection => set(ConnectionProviderEnum.CUSTOM, connection)}
        />
      </S.Method>
    </>
  );
};
