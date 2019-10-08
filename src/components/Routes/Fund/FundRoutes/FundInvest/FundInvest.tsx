import React from 'react';
import { Spinner } from '~/components/Common/Spinner/Spinner';

export interface InvestProps {
  address: string;
}

export const Invest: React.FC<InvestProps> = ({ address }) => {
  return <Spinner positioning="centered" />;
};

export default Invest;
