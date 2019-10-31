import gql from 'graphql-tag';
import { useOnChainQuery } from '~/hooks/useQuery';
import { Maybe } from '~/types';

export interface PriceFeedUpdateQueryResult {
  prices: {
    lastUpdate: Date;
  };
}

const PriceFeedUpdateQuery = gql`
  query PriceFeedUpdateQuery {
    prices {
      lastUpdate
    }
  }
`;

export const usePriceFeedUpdateQuery = () => {
  const result = useOnChainQuery<PriceFeedUpdateQueryResult>(PriceFeedUpdateQuery);
  return [result.data && result.data.prices && result.data.prices.lastUpdate, result] as [Maybe<Date>, typeof result];
};
