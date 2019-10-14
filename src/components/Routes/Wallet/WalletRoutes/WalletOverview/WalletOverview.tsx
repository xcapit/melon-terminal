import React from 'react';
import * as R from 'ramda';
import NoMatch from '~/components/Routes/NoMatch/NoMatch';
import { Spinner } from '~/components/Common/Spinner/Spinner';
import { useWalletOverviewQuery, WalletOverviewQueryResult } from './WalletOverview.query';
import * as S from './WalletOverview.styles';

type Account = WalletOverviewQueryResult['account'];

export const WalletOverview: React.FC = () => {
  const query = useWalletOverviewQuery();
  if (query.loading) {
    return <Spinner positioning="centered" size="large" />;
  }

  const data = R.path<Account>(['account'], query.data);
  if (!data) {
    return <NoMatch />;
  }

  return (
    <S.WalletOverviewBody>
      <S.WalletOverviewTitle>Balances</S.WalletOverviewTitle>
      <S.WalletOverviewBalances>
        {data.eth && (
          <S.WalletOverviewBalance>
            <S.WalletOverviewBalanceLabel>ETH</S.WalletOverviewBalanceLabel>
            <S.WalletOverviewBalanceValue>{data.eth.toFixed(8)}</S.WalletOverviewBalanceValue>
          </S.WalletOverviewBalance>
        )}
        {data.weth && (
          <S.WalletOverviewBalance>
            <S.WalletOverviewBalanceLabel>WETH</S.WalletOverviewBalanceLabel>
            <S.WalletOverviewBalanceValue>{data.weth.toFixed(8)}</S.WalletOverviewBalanceValue>
          </S.WalletOverviewBalance>
        )}
      </S.WalletOverviewBalances>
      <S.WalletOverviewTitle>Fund</S.WalletOverviewTitle>
      <S.WalletOverviewFundActions>
        <S.WalletOverviewFundAction to="/setup">Setup your fund</S.WalletOverviewFundAction>
      </S.WalletOverviewFundActions>
    </S.WalletOverviewBody>
  );
};

export default WalletOverview;
