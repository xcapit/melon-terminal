import React from 'react';
import { MaxPositionsPolicy } from './FundPolicies.query';
import { BodyCell } from '~/components/Common/Table/Table';

interface MaxPositionsProps {
  policy: MaxPositionsPolicy;
}

export const MaxPositions: React.FC<MaxPositionsProps> = ({ policy }) => {
  return <BodyCell>{policy.maxPositions}</BodyCell>;
};
