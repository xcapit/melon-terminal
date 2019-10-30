import BigNumber from 'bignumber.js';
import gql from 'graphql-tag';
import { useOnChainQuery } from '~/hooks/useQuery';

export interface WalletOverviewQueryResult {
  account: {
    eth: BigNumber;
    weth: BigNumber;
  };
}

const WalletOverviewQuery = gql`
  query WalletOverviewQuery {
    account {
      eth: balance(token: ETH)
      weth: balance(token: WETH)
    }
  }
`;

export const useWalletOverviewQuery = () => {
  return useOnChainQuery<WalletOverviewQueryResult>(WalletOverviewQuery);
};
