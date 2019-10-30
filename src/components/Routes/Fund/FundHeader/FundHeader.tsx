import React from 'react';
import format from 'date-fns/format';
import { useEtherscanLink } from '~/hooks/useEtherscanLink';
import { Spinner } from '~/components/Common/Spinner/Spinner';
import { useFundHeaderQuery } from './FundHeader.query';
import * as S from './FundHeader.styles';

export interface FundHeaderProps {
  address: string;
}

export const FundHeader: React.FC<FundHeaderProps> = ({ address }) => {
  const query = useFundHeaderQuery(address);
  const data = query.data && query.data.fund;

  const fundEtherscanLink = useEtherscanLink(address);
  const managerEtherscanLink = useEtherscanLink(data && data.manager);
  if (query.loading) {
    return <Spinner />;
  }

  if (!data) {
    return null;
  }

  const accounting = data && data.routes && data.routes.accounting;
  const manager = data && data.manager;
  const creation = data && data.creationTime;

  return (
    <S.FundHeader>
      <S.FundHeaderHeadline>
        <S.FundHeaderTitle>{data.name}</S.FundHeaderTitle>
        <S.FundHeaderLinks>
          {
            <a href={fundEtherscanLink!} title={address}>
              View on etherscan
            </a>
          }
        </S.FundHeaderLinks>
      </S.FundHeaderHeadline>
      <S.FundHeaderInformation>
        <S.FundHeaderItem>
          <S.FundHeaderItemTitle>Share price</S.FundHeaderItemTitle>
          {accounting && accounting.sharePrice.toFixed(4)}
        </S.FundHeaderItem>
        <S.FundHeaderItem>
          <S.FundHeaderItemTitle>AUM</S.FundHeaderItemTitle>
          XXX
        </S.FundHeaderItem>
        <S.FundHeaderItem>
          <S.FundHeaderItemTitle>Creation date</S.FundHeaderItemTitle>
          {format(creation, 'yyyy-MM-dd hh:mm a')}
        </S.FundHeaderItem>
        <S.FundHeaderItem>
          <S.FundHeaderItemTitle>Manager</S.FundHeaderItemTitle>
          <a href={managerEtherscanLink!} title={manager}>
            {manager}
          </a>
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
