import React from 'react';
import { Spinner } from '../../../../Common/Spinner/Spinner';

export interface FundDetailsProps {
  address: string;
}

export const FundDetails: React.FC<FundDetailsProps> = ({ address }) => {
  return <Spinner positioning="centered" size="large" />;
};

export default FundDetails;
