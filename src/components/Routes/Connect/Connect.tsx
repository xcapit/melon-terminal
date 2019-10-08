import React, { useContext } from 'react';
import { ConnectionContext } from '~/components/Contexts/Connection';
import { ConnectionSelector } from './ConnectionSelector/ConnectionSelector';

export const Connect = () => {
  const { provider, set } = useContext(ConnectionContext);

  return <ConnectionSelector current={provider} set={set} />;
};

export default Connect;
