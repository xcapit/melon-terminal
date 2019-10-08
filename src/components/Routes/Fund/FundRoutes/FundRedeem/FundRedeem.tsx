import React from 'react';
import { Spinner } from '../../../../Common/Spinner/Spinner';

export interface RedeemProps {
  address: string;
}

export const Redeem: React.FC<RedeemProps> = ({ address }) => {
  return <Spinner />;
};

export default Redeem;
