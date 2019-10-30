import React from 'react';
import { Spinner } from '~/components/Common/Spinner/Spinner';
import { useFundHoldingsQuery } from './FundHoldings.query';

export interface FundHoldingsProps {
  address: string;
}

export const FundHoldings: React.FC<FundHoldingsProps> = ({ address }) => {
  const query = useFundHoldingsQuery(address);
  const data = query.data && query.data.fund;

  if (query.loading) {
    return <Spinner />;
  }

  if (!data) {
    return null;
  }

  const routes = data && data.routes;
  const accounting = routes && routes.accounting;
  const holdings = accounting && accounting.holdings;

  return (
    <div>
      {holdings &&
        holdings.map(holding => (
          <div key={holding.token.address}>
            {holding.token.symbol}: {holding.amount.toFixed(4)}
          </div>
        ))}
    </div>
  );
};

export default FundHoldings;
