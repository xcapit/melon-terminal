import React from 'react';
import { Link } from 'react-router-dom';
import * as S from './Header.styles';

export const Header: React.FC = () => (
  <S.HeaderPosition>
    <S.Header>
      <S.LogoContainer>
        <Link to="/">
          <S.Logo name="with-text" height={30} width={150} />
        </Link>
      </S.LogoContainer>
      <S.Account>
        <S.AccountName />
        <S.AccountInfo>
          <S.AccountAddress>Your wallet</S.AccountAddress>
          <S.AccountNetwork>LIVE</S.AccountNetwork>
          <S.AccountStatus>Insufficient funds</S.AccountStatus>
        </S.AccountInfo>
      </S.Account>
    </S.Header>
  </S.HeaderPosition>
);
