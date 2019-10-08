import React from 'react';
import { useLocation, useHistory } from 'react-router';
import { ConnectionProvider, ConnectionProviderTypeEnum } from '../../../Contexts/Connection';
import { Maybe } from '../../../../types';

export interface ConnectionProviderSelectorProps {
  current: ConnectionProvider;
  set: React.Dispatch<React.SetStateAction<Maybe<ConnectionProviderTypeEnum>>>;
}

export const ConnectionSelector: React.FC<ConnectionProviderSelectorProps> = ({ current, set }) => {
  const history = useHistory();
  const location = useLocation();
  const keys = (Object.keys(ConnectionProviderTypeEnum) as any) as (keyof ConnectionProviderTypeEnum)[];

  return (
    <div>
      <h2>Select the provider to use for connecting to the ethereum blockchain.</h2>
      <div>
        {keys.map(key => {
          const value = (ConnectionProviderTypeEnum as any)[key as any] as any;
          const click = () => {
            set(value);

            if (location.state && location.state.redirect) {
              history.push(location.state.redirect);
            }
          };

          return (
            <button key={key} onClick={click} disabled={current === value}>
              {key}
            </button>
          );
        })}
      </div>
    </div>
  );
};
