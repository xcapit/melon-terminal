import React from 'react';
import format from 'date-fns/format';
import * as S from './FundHeader.styles';
import { useEtherscanLink } from '~/hooks/useEtherscanLink';
import { Spinner } from '~/components/Common/Spinner/Spinner';
import { useFundHeaderQuery } from './FundHeader.query';

export interface FundHeaderProps {
  address: string;
}

export const FundHeader: React.FC<FundHeaderProps> = ({ address }) => {
  const etherscanLink = useEtherscanLink(address);
  const query = useFundHeaderQuery(address);
  if (query.loading) {
    return <Spinner />;
  }

  const data = query && query.data && query.data.fund;
  if (!data) {
    return null;
  }

  return (
    <S.FundHeader>
      <S.FundHeaderHeadline>
        <S.FundHeaderTitle>{data.name}</S.FundHeaderTitle>
        <S.FundHeaderLinks>
          {
            <a href={etherscanLink!} title={address}>
              View on etherscan
            </a>
          }
        </S.FundHeaderLinks>
      </S.FundHeaderHeadline>
      <S.FundHeaderInformation>
        <S.FundHeaderItem>
          <S.FundHeaderItemTitle>Share price</S.FundHeaderItemTitle>
          {data.sharePrice && data.sharePrice.toFixed(4)}
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
          {data.creationTime && format(data.creationTime, 'yyyy-MM-dd hh:mm a')}
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
