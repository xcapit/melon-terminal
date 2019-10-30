import gql from 'graphql-tag';
import BigNumber from 'bignumber.js';
import { useOnChainQuery } from '~/hooks/useQuery';

export interface FundHoldingsQueryResult {
  fund: {
    routes?: {
      accounting?: {
        holdings: {
          amount: BigNumber;
          token: {
            address: string;
            symbol: string;
            name: string;
          };
        }[];
      };
    };
  };
}

export interface FundHoldingsQueryVariables {
  address: string;
}

const FundHoldingsQuery = gql`
  query FundHoldingsQuery($address: String!) {
    fund(address: $address) {
      routes {
        accounting {
          holdings {
            amount
            token {
              address
              symbol
              name
            }
          }
        }
      }
    }
  }
`;

export const useFundHoldingsQuery = (address: string) => {
  const options = {
    variables: { address },
  };

  return useOnChainQuery<FundHoldingsQueryResult, FundHoldingsQueryVariables>(FundHoldingsQuery, options);
};
