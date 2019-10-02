import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
// @ts-ignore
import createProvider from 'eth-provider';

const Wrapper = styled.div`
  margin: 20px;
`;

// TODO: Fix this type once there is a common provider type.
export type EthereumProvider = any;

export enum EthereumProviderTypeEnum {
  'FRAME' = 'frame',
  'INJECTED' = 'injected',
};

export interface EthereumProviderSelection {
  type: EthereumProviderTypeEnum,
  instance: EthereumProvider,
}

export interface EthereumProviderSelectorProps {
  type: EthereumProvider;
  setType: ReturnType<typeof useEthereumProvider>[2]
}

export const EthereumProviderSelector: React.FC<EthereumProviderSelectorProps> = ({ type, setType }) => {
  return (
    <Wrapper>
      <h2>Select the provider to use for connecting to the ethereum blockchain.</h2>
      <div>
        <button
          onClick={() => setType(EthereumProviderTypeEnum.INJECTED)}
          disabled={type === EthereumProviderTypeEnum.INJECTED}
        >
          Injected
        </button>
        <button
          onClick={() => setType(EthereumProviderTypeEnum.FRAME)}
          disabled={type === EthereumProviderTypeEnum.FRAME}
        >
          Frame
        </button>
      </div>
    </Wrapper>
  );
};

export const useEthereumProvider = () => {
  const [type, setType] = useState<EthereumProviderTypeEnum>(EthereumProviderTypeEnum.INJECTED);
  const provider = useMemo<EthereumProvider>(() => createProvider([type], {
    name: 'avantgarde-experiment',
  }), [type]);

  return [provider, type, setType] as [EthereumProvider, typeof type, typeof setType];
};
