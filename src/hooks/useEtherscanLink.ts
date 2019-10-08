import { useContext } from 'react';
import { ConnectionContext } from '~/components/Contexts/Connection';

export const useEtherscanLink = (address: string) => {
  const { connection } = useContext(ConnectionContext);

  if (connection && connection.network === 1) {
    return `https://etherscan.io/address/${address}`;
  }

  if (connection && connection.network === 42) {
    return `https://kovan.etherscan.io/address/${address}`;
  }

  return null;
};
