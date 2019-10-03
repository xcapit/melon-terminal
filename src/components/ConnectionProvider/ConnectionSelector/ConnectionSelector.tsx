import React from 'react';
import styled, { css } from 'styled-components';
import { ConnectionProvider, ConnectionProviderTypeEnum } from '../ConnectionProvider';

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

export interface ConnectionProviderSelectorProps {
  current: ConnectionProvider;
  set: React.Dispatch<React.SetStateAction<ConnectionProviderTypeEnum>>
}

export const ConnectionSelector: React.FC<ConnectionProviderSelectorProps> = ({ current, set }) => {
  const keys = Object.keys(ConnectionProviderTypeEnum) as any as (keyof ConnectionProviderTypeEnum)[];
  
  return (
    <Wrapper>
      <h2>Select the provider to use for connecting to the ethereum blockchain.</h2>
      <div>
        {keys.map(key => {
          const value = (ConnectionProviderTypeEnum as any)[key as any] as any;

          return (
            <Button key={key} onClick={() => set(value)} disabled={current === value}>
              {key}
            </Button>
          );
        })}
      </div>
    </Wrapper>
  );
};
