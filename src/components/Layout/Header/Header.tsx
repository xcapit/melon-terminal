import BigNumber from 'bignumber.js';
import React from 'react';
import * as R from 'ramda';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';
import { useOnChainQuery } from '~/hooks/useQuery';
import * as S from './Header.styles';
import { NetworkEnum } from '~/types';

const HeaderQuery = gql`
  query HeaderQuery {
    network
    account {
      balance
    }
  }
`;

export const Header: React.FC = () => {
  const location = useLocation();
  const { data } = useOnChainQuery(HeaderQuery);

  const status = 'Insufficient funds';
  const network = R.pathOr<NetworkEnum>(NetworkEnum.OFFLINE, ['network'], data);
  const balance = R.path<BigNumber>(['account', 'balance'], data);

  return (
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
            <S.AccountNetwork>
              <Link to={{ pathname: '/connect', state: { redirect: location } }}>{network}</Link>
            </S.AccountNetwork>
            {balance && <S.AccountBalance>{balance.toFixed(4)} ETH</S.AccountBalance>}
            {status && <S.AccountStatus>{status}</S.AccountStatus>}
          </S.AccountInfo>
        </S.Account>
      </S.Header>
    </S.HeaderPosition>
  );
};
