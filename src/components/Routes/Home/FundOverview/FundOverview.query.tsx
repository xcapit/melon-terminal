import gql from 'graphql-tag';
import { useTheGraphQuery } from '~/hooks/useQuery';

export interface FundOverviewQueryResult {
  funds: {
    id: string;
    name: string;
    sharePrice: string;
    totalSupply: string;
    isShutdown: boolean;
    createdAt: number;
    version: {
      name: string;
    };
  }[];
}

export interface FundOverviewQueryVariables {
  address: string;
}

const FundOverviewQuery = gql`
  query FundOverviewQuery {
    funds(orderBy: name, first: 20) {
      id
      name
      gav
      sharePrice
      totalSupply
      isShutdown
      createdAt
      version {
        name
      }
    }
  }
`;

export const useFundOverviewQuery = () => {
  return useTheGraphQuery<FundOverviewQueryResult, FundOverviewQueryVariables>(FundOverviewQuery);
};
