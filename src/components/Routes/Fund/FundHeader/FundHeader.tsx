import React from 'react';
import BigNumber from 'bignumber.js';
import gql from 'graphql-tag';
import format from 'date-fns/format';
import * as S from './FundHeader.styles';
import { useOnChainQuery } from '../../../../hooks/useQuery';
import { useEtherscanLink } from '../../../../hooks/useEtherscanLink';
import { Spinner } from '../../../Common/Spinner/Spinner';

const FundHeaderQuery = gql`
  query FundHeaderQuery($address: String!) {
    fund(address: $address) {
      id
      name
      manager
      creationTime
      sharePrice
      # totalSupply
      # nav
      # gav
      # managementFeeRate
      # performanceFeeRate
      # performanceFeePeriod
    }
  }
`;

interface FundHeaderQueryResult {
  fund: {
    id: string;
    name: string;
    creationTime: Date;
    sharePrice?: BigNumber;
  };
}

export interface FundHeaderProps {
  address: string;
}

export const FundHeader: React.FC<FundHeaderProps> = ({ address }) => {
  const etherscanLink = useEtherscanLink(address);
  const { data: { fund } = {} as FundHeaderQueryResult, loading } = useOnChainQuery<FundHeaderQueryResult>(
    FundHeaderQuery,
    {
      variables: { address },
    }
  );

  if (loading) {
    return <Spinner />;
  }

  return (
    <S.FundHeader>
      <S.FundHeaderHeadline>
        <S.FundHeaderTitle>{fund.name}</S.FundHeaderTitle>
        <S.FundHeaderLinks>{<a href={etherscanLink!}>View on etherscan</a>}</S.FundHeaderLinks>
      </S.FundHeaderHeadline>
      <S.FundHeaderInformation>
        <S.FundHeaderItem>
          <S.FundHeaderItemTitle>Share price</S.FundHeaderItemTitle>
          {fund.sharePrice && fund.sharePrice.toFixed(4)}
        </S.FundHeaderItem>
        <S.FundHeaderItem>
          <S.FundHeaderItemTitle>AUM</S.FundHeaderItemTitle>
          XXX
        </S.FundHeaderItem>
        <S.FundHeaderItem>
          <S.FundHeaderItemTitle>Ranking</S.FundHeaderItemTitle>
          XXX
        </S.FundHeaderItem>
        <S.FundHeaderItem>
          <S.FundHeaderItemTitle>Creation date</S.FundHeaderItemTitle>
          {format(fund.creationTime, 'yyyy-MM-dd hh:mm a')}
        </S.FundHeaderItem>
        <S.FundHeaderItem>
          <S.FundHeaderItemTitle>Total number of shares</S.FundHeaderItemTitle>
          XXX
        </S.FundHeaderItem>
        <S.FundHeaderItem />
        <S.FundHeaderItem>
          <S.FundHeaderItemTitle>Management fee</S.FundHeaderItemTitle>
          XXX
        </S.FundHeaderItem>
        <S.FundHeaderItem>
          <S.FundHeaderItemTitle>Performance fee</S.FundHeaderItemTitle>
          XXX
        </S.FundHeaderItem>
        <S.FundHeaderItem>
          <S.FundHeaderItemTitle>Performance fee period</S.FundHeaderItemTitle>
          XXX
        </S.FundHeaderItem>
      </S.FundHeaderInformation>
    </S.FundHeader>
  );
};
