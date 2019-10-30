import BigNumber from 'bignumber.js';
import React from 'react';
import * as R from 'ramda';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';
import { useOnChainQuery } from '~/hooks/useQuery';
import { NetworkEnum } from '~/types';
import * as S from './Header.styles';

const HeaderQuery = gql`
  query HeaderQuery {
    network
    account {
      id
      address
      balance(token: ETH)
    }
  }
`;

export const Header: React.FC = () => {
  const location = useLocation();
  const query = useOnChainQuery(HeaderQuery);

  const network = R.path<NetworkEnum>(['network'], query.data);
  const balance = R.path<BigNumber>(['account', 'balance'], query.data);
  const address = R.path<string>(['account', 'address'], query.data);

  return (
    <S.HeaderPosition>
      <S.Header>
        <S.LogoContainer>
          <Link to="/">
            <S.Logo name="with-text" height={30} width={120} />
          </Link>
        </S.LogoContainer>
        {!query.loading && (
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
