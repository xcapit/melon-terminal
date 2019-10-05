import React from 'react';
import gql from 'graphql-tag';
import { useOnChainQuery } from '../../../../hooks/apolloQuery';

const query = gql`
  query FundDetailsQuery($address: String!) {
    fund(address: $address) {
      id
      address
      name
      manager
      creator
      creationTime
      routes {
        version
        accounting
        participation
        shares
        trading
        vault
        feeManager
        policyManager
      }
    }
  }
`;

export interface FundDetailsProps {
  address: string;
}

export const FundDetails: React.FC<FundDetailsProps> = ({ address }) => {
  const { data } = useOnChainQuery(query, {
    variables: { address },
  });

  return <div>{data && data.fund && data.fund.name}</div>;
};
