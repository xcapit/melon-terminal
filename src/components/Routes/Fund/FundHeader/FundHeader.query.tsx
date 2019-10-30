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
        grossAssetValue: BigNumber;
      };
      shares?: {
        totalSupply: BigNumber;
      };
      fees?: {
        managementFee?: {
          rate: BigNumber;
        };
        performanceFee?: {
          rate: BigNumber;
          period: number;
        };
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
          grossAssetValue
        }
        shares {
          totalSupply
        }
        fees {
          managementFee {
            rate
          }
          performanceFee {
            rate
            period
          }
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
