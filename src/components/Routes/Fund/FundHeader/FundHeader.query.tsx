import BigNumber from 'bignumber.js';
import gql from 'graphql-tag';
import { useOnChainQuery } from '~/hooks/useQuery';

export interface FundHeaderQueryResult {
  fund: {
    id: string;
    name: string;
    creationTime: Date;
    sharePrice?: BigNumber;
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
      sharePrice
      # totalSupply
      # nav
      # gav
      # managementFeeRate
      # performanceFeeRate
      # performanceFeePeriod
    }
  }
`;

export const useFundHeaderQuery = (address: string) => {
  const options = {
    variables: { address },
  };

  return useOnChainQuery<FundHeaderQueryResult, FundHeaderQueryVariables>(FundHeaderQuery, options);
};
