import React from 'react';
import { useParams } from 'react-router';
import { FundDetails } from './FundDetails/FundDetails';

export interface FundRouteParams {
  address: string;
}

export const Fund: React.FC = () => {
  const params = useParams<FundRouteParams>();
  return <FundDetails address={params.address} />;
};

export default Fund;
