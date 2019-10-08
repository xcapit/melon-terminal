import React from 'react';
import { Spinner } from '../../../../Common/Spinner/Spinner';

export interface InvestProps {
  address: string;
}

export const Invest: React.FC<InvestProps> = ({ address }) => {
  return <Spinner />;
};

export default Invest;
