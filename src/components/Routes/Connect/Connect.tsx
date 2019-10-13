import React, { useContext } from 'react';
import { ConnectionSelector } from './ConnectionSelector/ConnectionSelector';
import { OnChainContext } from '~/components/Contexts/Connection';

export const Connect = () => {
  const { provider, set } = useContext(OnChainContext);
  return <ConnectionSelector current={provider} set={set} />;
};

export default Connect;
