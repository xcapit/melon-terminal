import React from 'react';
import FundHoldings from './FundHoldings/FundHoldings';

export interface FundDetailsProps {
  address: string;
}

export const FundDetails: React.FC<FundDetailsProps> = ({ address }) => <FundHoldings address={address} />;

export default FundDetails;
