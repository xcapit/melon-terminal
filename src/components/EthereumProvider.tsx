import React, { useState, useMemo } from 'react';
import styled, { css } from 'styled-components';
// @ts-ignore
import createProvider from 'eth-provider';

const Wrapper = styled.div`
  margin: 20px;
`;

const Button = styled.button`
  color: black;
  border: none;
  outline: none;
  padding: 10px;
  margin: 10px;
  cursor: pointer;

  &:first-child {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }

  ${(props) => props.disabled && css`
    cursor: default;
    font-weight: bold;
    background-color: green;
  `}
`;

// TODO: Fix this type once there is a common provider type.
export type EthereumProvider = any;

export enum EthereumProviderTypeEnum {
  'FRAME' = 'frame',
  'INJECTED' = 'injected',
  'KOVAN' = 'https://kovan.infura.io/v3/8332aa03fcfa4c889aeee4d0e0628660',
  'MAINNET' = 'https://mainnet.infura.io/v3/8332aa03fcfa4c889aeee4d0e0628660',
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
  const keys = Object.keys(EthereumProviderTypeEnum) as any as (keyof EthereumProviderTypeEnum)[];

  return (
    <Wrapper>
      <h2>Select the provider to use for connecting to the ethereum blockchain.</h2>
      <div>
        {keys.map(key => {
          const value = (EthereumProviderTypeEnum as any)[key as any] as any;

          return (
            <Button onClick={() => setType(value)} disabled={type === value}>
              {key}
            </Button>
          );
        })}
      </div>
    </Wrapper>
  );
};

export const useEthereumProvider = () => {
  const [type, setType] = useState<EthereumProviderTypeEnum>(EthereumProviderTypeEnum.INJECTED);
  const provider = useMemo<EthereumProvider>(() => createProvider(type, {
    name: 'avantgarde-experiment',
  }), [type]);

  return [provider, type, setType] as [EthereumProvider, typeof type, typeof setType];
};
