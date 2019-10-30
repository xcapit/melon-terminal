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

  const routes = data && data.routes;
  const accounting = routes && routes.accounting;
  const shares = routes && routes.shares;
  const manager = data && data.manager;
  const creation = data && data.creationTime;

  const fees = routes && routes.fees;
  const managementFee = fees && fees.managementFee;
  const performanceFee = fees && fees.performanceFee;

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
          {accounting && accounting.sharePrice && accounting.sharePrice.toFixed(4)}
        </S.FundHeaderItem>
        <S.FundHeaderItem>
          <S.FundHeaderItemTitle>AUM</S.FundHeaderItemTitle>
          {accounting && accounting.grossAssetValue && accounting.grossAssetValue.toFixed(4)}
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
          {shares && shares.totalSupply && shares.totalSupply.toFixed(4)}
        </S.FundHeaderItem>
        <S.FundHeaderItem />
        <S.FundHeaderItem>
          <S.FundHeaderItemTitle>Management fee</S.FundHeaderItemTitle>
          {managementFee && managementFee.rate && managementFee.rate.toFixed(4)}
        </S.FundHeaderItem>
        <S.FundHeaderItem>
          <S.FundHeaderItemTitle>Performance fee</S.FundHeaderItemTitle>
          {performanceFee && performanceFee.rate && performanceFee.rate.toFixed(4)}
        </S.FundHeaderItem>
        <S.FundHeaderItem>
          <S.FundHeaderItemTitle>Performance fee period</S.FundHeaderItemTitle>
          {performanceFee && performanceFee.period && `${performanceFee.period / (60 * 60 * 24)} days`}
        </S.FundHeaderItem>
      </S.FundHeaderInformation>
    </S.FundHeader>
  );
};
