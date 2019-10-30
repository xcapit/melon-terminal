export const useEtherscanLink = (address?: string) => {
  if (address && process.env.NETWORK === 'MAINNET') {
    return `https://etherscan.io/address/${address}`;
  }

  if (address && process.env.NETWORK === 'KOVAN') {
    return `https://kovan.etherscan.io/address/${address}`;
  }

  return null;
};
