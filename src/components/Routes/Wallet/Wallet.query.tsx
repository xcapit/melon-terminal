import gql from 'graphql-tag';
import { useOnChainQuery } from '~/hooks/useQuery';

export interface WalletQueryResult {
  account: {
    id: string;
    address: string;
  };
}

export interface WalletQueryVariables {
  address: string;
}

const WalletQuery = gql`
  query WalletQuery {
    account {
      id
      address
    }
  }
`;

export const useWalletQuery = () => {
  return useOnChainQuery<WalletQueryResult, WalletQueryVariables>(WalletQuery);
};
