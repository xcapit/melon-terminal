import React from 'react';
import { FundDetails } from './FundDetails/FundDetails';
import { RouteComponentProps } from 'react-router';

export interface FundProps {
  address: string;
};

export const Fund: React.FC<RouteComponentProps<FundProps>> = (props) => {
  return (
    <FundDetails address={props.match.params.address} />
  );
};

export default Fund;
