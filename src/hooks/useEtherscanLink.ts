export const useEtherscanLink = (address?: string) => {
  if (address && process.env.ETHEREUM_NETWORK === 'MAINNET') {
    return `https://etherscan.io/address/${address}`;
  }

  if (address && process.env.ETHEREUM_NETWORK === 'KOVAN') {
    return `https://kovan.etherscan.io/address/${address}`;
  }

  return null;
};
