import React from 'react';
import { Spinner } from '~/components/Common/Spinner/Spinner';

export interface RedeemProps {
  address: string;
}

export const Redeem: React.FC<RedeemProps> = ({ address }) => {
  return <Spinner positioning="centered" />;
};

export default Redeem;
