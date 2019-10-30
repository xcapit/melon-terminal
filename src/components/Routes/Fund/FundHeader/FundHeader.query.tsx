import gql from 'graphql-tag';
import BigNumber from 'bignumber.js';
import { useOnChainQuery } from '~/hooks/useQuery';

export interface FundHeaderQueryResult {
  fund: {
    id: string;
    name: string;
    manager: string;
    creationTime: Date;
    routes?: {
      accounting?: {
        sharePrice: BigNumber;
      };
    };
  };
}

export interface FundHeaderQueryVariables {
  address: string;
}

const FundHeaderQuery = gql`
  query FundHeaderQuery($address: String!) {
    fund(address: $address) {
      id
      name
      manager
      creationTime
      routes {
        accounting {
          sharePrice
        }
      }
    }
  }
`;

export const useFundHeaderQuery = (address: string) => {
  const options = {
    variables: { address },
  };

  return useOnChainQuery<FundHeaderQueryResult, FundHeaderQueryVariables>(FundHeaderQuery, options);
};
