import gql from 'graphql-tag';
import BigNumber from 'bignumber.js';
import { Address } from '@melonproject/melonjs';
import { useOnChainQuery } from '~/hooks/useQuery';
import { Maybe, NetworkEnum } from '~/types';

export interface ConnectionQueryResult {
  network: NetworkEnum;
  account?: {
    address: Address;
    balance: BigNumber;
  };
}

const ConnectionQuery = gql`
  query ConnectionQuery {
    network
    account {
      address
      balance(token: ETH)
    }
  }
`;

export const useConnectionQuery = () => {
  const result = useOnChainQuery<ConnectionQueryResult>(ConnectionQuery);
  return [result.data, result] as [Maybe<ConnectionQueryResult>, typeof result];
};
