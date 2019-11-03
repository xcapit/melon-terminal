import gql from 'graphql-tag';
import BigNumber from 'bignumber.js';
import { Address } from '@melonproject/melonjs';
import { useOnChainQuery } from '~/hooks/useQuery';
import { Maybe, NetworkEnum } from '~/types';

export interface ConnectionDetailsResult {
  network: NetworkEnum;
  account?: {
    address: Address;
    balance: BigNumber;
  };
}

const ConnectionDetailsQuery = gql`
  query ConnectionDetailsQuery {
    network
    account {
      address
      balance(token: ETH)
    }
  }
`;

export const useConnectionDetails = () => {
  const result = useOnChainQuery<ConnectionDetailsResult>(ConnectionDetailsQuery);
  return [result.data, result] as [Maybe<ConnectionDetailsResult>, typeof result];
};
