import React from 'react';
import * as S from './WalletNavigation.styles';

export const WalletNavigation: React.FC = () => {
  return (
    <S.WalletNavigation>
      <S.WalletNavigationLink to="/wallet" exact={true} activeClassName="active">
        Overview
      </S.WalletNavigationLink>
      <S.WalletNavigationLink to="/wallet/wrap" exact={true} activeClassName="active">
        Wrap Ether
      </S.WalletNavigationLink>
      <S.WalletNavigationLink to="/wallet/unwrap" exact={true} activeClassName="active">
        Unwrap Ether
      </S.WalletNavigationLink>
    </S.WalletNavigation>
  );
};
