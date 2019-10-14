import React from 'react';
import * as R from 'ramda';
import { Switch, Route, useRouteMatch } from 'react-router';
import { Spinner } from '~/components/Common/Spinner/Spinner';
import { WalletHeader } from './WalletHeader/WalletHeader';
import { WalletNavigation } from './WalletNavigation/WalletNavigation';
import { useWalletQuery } from './Wallet.query';
import * as S from './Wallet.styles';

const NoMatch = React.lazy(() => import('~/components/Routes/NoMatch/NoMatch'));
const WalletOverview = React.lazy(() => import('./WalletRoutes/WalletOverview/WalletOverview'));
const WalletUnwrapEther = React.lazy(() => import('./WalletRoutes/WalletUnwrapEther/WalletUnwrapEther'));
const WalletWrapEther = React.lazy(() => import('./WalletRoutes/WalletWrapEther/WalletWrapEther'));

export const Wallet: React.FC = () => {
  const match = useRouteMatch()!;
  const query = useWalletQuery();
  if (query.loading) {
    return <Spinner />;
  }

  const address = R.path<string>(['account', 'address'], query.data);
  if (!address) {
    return <NoMatch />;
  }

  return (
    <>
      <S.WalletHeader>
        <WalletHeader address={address} />
      </S.WalletHeader>
      <S.WalletNavigation>
        <WalletNavigation />
      </S.WalletNavigation>
      <S.WalletBody>
        <Switch>
          <Route path={match.path} exact={true}>
            <WalletOverview />
          </Route>
          <Route path={`${match.path}/wrap`} exact={true}>
            <WalletWrapEther />
          </Route>
          <Route path={`${match.path}/unwrap`} exact={true}>
            <WalletUnwrapEther />
          </Route>
          <Route>
            <NoMatch />
          </Route>
        </Switch>
      </S.WalletBody>
    </>
  );
};

export default Wallet;
