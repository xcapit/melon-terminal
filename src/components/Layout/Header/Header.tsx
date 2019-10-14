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
      id
      address
      balance
    }
  }
`;

export const Header: React.FC = () => {
  const location = useLocation();
  const { data, loading } = useOnChainQuery(HeaderQuery);

  const network = R.path<NetworkEnum>(['network'], data);
  const balance = R.path<BigNumber>(['account', 'balance'], data);
  const address = R.path<string>(['account', 'address'], data);

  return (
    <S.HeaderPosition>
      <S.Header>
        <S.LogoContainer>
          <Link to="/">
            <S.Logo name="with-text" height={30} width={150} />
          </Link>
        </S.LogoContainer>
        {!loading && (
          <S.Account>
            <S.AccountName />
            <S.AccountInfo>
              {address && (
                <S.AccountAddress>
                  <Link to="/wallet" title={address}>
                    Your wallet
                  </Link>
                </S.AccountAddress>
              )}
              <S.AccountNetwork>
                <Link to={{ pathname: '/connect', state: { redirect: location } }} title="Change connection method">
                  {network}
                </Link>
              </S.AccountNetwork>
              {balance && <S.AccountBalance>{balance.toFixed(4)} ETH</S.AccountBalance>}
            </S.AccountInfo>
          </S.Account>
        )}
      </S.Header>
    </S.HeaderPosition>
  );
};
