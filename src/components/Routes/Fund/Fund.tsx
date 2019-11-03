import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router';
import { RequireSecureConnection } from '~/components/Contexts/Connection';
import { useFundExistsQuery } from '~/queries/FundExists';
import { Spinner } from '~/components/Common/Spinner/Spinner';
import { FundHeader } from './FundHeader/FundHeader';
import { FundNavigation } from './FundNavigation/FundNavigation';
import * as S from './Fund.styles';

const NoMatch = React.lazy(() => import('~/components/Routes/NoMatch/NoMatch'));
const FundRedeem = React.lazy(() => import('./FundRoutes/FundRedeem/FundRedeem'));
const FundInvest = React.lazy(() => import('./FundRoutes/FundInvest/FundInvest'));
const FundDetails = React.lazy(() => import('./FundRoutes/FundDetails/FundDetails'));

export interface FundRouteParams {
  address: string;
}

export const Fund: React.FC = () => {
  const match = useRouteMatch<FundRouteParams>()!;
  const [exists, query] = useFundExistsQuery(match.params.address);
  if (query.loading) {
    return <Spinner positioning="centered" />;
  }

  if (!exists) {
    return <NoMatch />;
  }

  return (
    <>
      <S.FundHeader>
        <FundHeader address={match.params.address} />
      </S.FundHeader>
      <S.FundNavigation>
        <FundNavigation address={match.params.address} />
      </S.FundNavigation>
      <S.FundBody>
        <Switch>
          <Route path={match.path} exact={true}>
            <FundDetails address={match.params.address} />
          </Route>
          <Route path={`${match.path}/invest`} exact={true}>
            <RequireSecureConnection>
              <FundInvest address={match.params.address} />
            </RequireSecureConnection>
          </Route>
          <Route path={`${match.path}/redeem`} exact={true}>
            <RequireSecureConnection>
              <FundRedeem address={match.params.address} />
            </RequireSecureConnection>
          </Route>
          <Route>
            <NoMatch />
          </Route>
        </Switch>
      </S.FundBody>
    </>
  );
};

export default Fund;
