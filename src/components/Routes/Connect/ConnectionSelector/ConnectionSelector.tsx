import React from 'react';
import { ConnectionProvider, ConnectionProviderTypeEnum } from '../../../Contexts/Connection';
import { Maybe } from '../../../../types';

export interface ConnectionProviderSelectorProps {
  current: ConnectionProvider;
  set: React.Dispatch<React.SetStateAction<Maybe<ConnectionProviderTypeEnum>>>;
}

export const ConnectionSelector: React.FC<ConnectionProviderSelectorProps> = ({ current, set }) => {
  const keys = (Object.keys(ConnectionProviderTypeEnum) as any) as (keyof ConnectionProviderTypeEnum)[];

  return (
    <div>
      <h2>Select the provider to use for connecting to the ethereum blockchain.</h2>
      <div>
        {keys.map(key => {
          const value = (ConnectionProviderTypeEnum as any)[key as any] as any;

          return (
            <button key={key} onClick={() => set(value)} disabled={current === value}>
              {key}
            </button>
          );
        })}
      </div>
    </div>
  );
};
