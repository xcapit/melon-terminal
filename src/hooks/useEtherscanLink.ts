import { useContext } from 'react';

export const useEtherscanLink = (address: string) => {
  if (process.env.NETWORK === 'MAINNET') {
    return `https://etherscan.io/address/${address}`;
  }

  if (process.env.NETWORK === 'KOVAN') {
    return `https://kovan.etherscan.io/address/${address}`;
  }

  return null;
};
