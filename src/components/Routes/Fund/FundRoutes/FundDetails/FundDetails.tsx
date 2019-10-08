import React from 'react';
import { Spinner } from '~/components/Common/Spinner/Spinner';

export interface FundDetailsProps {
  address: string;
}

export const FundDetails: React.FC<FundDetailsProps> = ({ address }) => {
  return <Spinner positioning="centered" />;
};

export default FundDetails;
