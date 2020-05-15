import * as Types from '../../../../subgraph';

import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type FundOverviewQueryVariables = {};

export type FundOverviewQuery = { __typename?: 'Query' } & {
  funds: Array<
    { __typename?: 'Fund' } & Pick<Types.Fund, 'id' | 'name' | 'inception' | 'active'> & {
        version: { __typename?: 'Version' } & Pick<Types.Version, 'id' | 'name'>;
        portfolio: { __typename?: 'Portfolio' } & Pick<Types.Portfolio, 'id'> & {
            holdings: Array<
              { __typename?: 'Holding' } & Pick<Types.Holding, 'id' | 'quantity'> & {
                  asset: { __typename?: 'Asset' } & Pick<Types.Asset, 'id' | 'symbol'>;
                }
            >;
          };
      }
  >;
};

export const FundOverviewDocument = gql`
  query FundOverview {
    funds(first: 1000) {
      id
      name
      inception
      active
      version {
        id
        name
      }
      portfolio {
        id
        holdings {
          id
          quantity
          asset {
            id
            symbol
          }
        }
      }
    }
  }
`;

export function useFundOverviewQuery(options: Omit<Urql.UseQueryArgs<FundOverviewQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<FundOverviewQuery>({ query: FundOverviewDocument, ...options });
}
