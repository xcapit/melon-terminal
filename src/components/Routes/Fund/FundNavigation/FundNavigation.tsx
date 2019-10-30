import React from 'react';
import * as S from './FundNavigation.styles';

export interface FundNavigationProps {
  address: string;
}

export const FundNavigation: React.FC<FundNavigationProps> = ({ address }) => {
  return (
    <S.FundNavigation>
      <S.FundNavigationLink to={`/fund/${address}`} exact={true} activeClassName="active">
        Overview
      </S.FundNavigationLink>
      <S.FundNavigationLink to={`/fund/${address}/invest`} exact={true} activeClassName="active">
        Invest
      </S.FundNavigationLink>
      <S.FundNavigationLink to={`/fund/${address}/redeem`} exact={true} activeClassName="active">
        Redeem
      </S.FundNavigationLink>
    </S.FundNavigation>
  );
};
