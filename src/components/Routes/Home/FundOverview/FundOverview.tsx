import React from 'react';
import BigNumber from 'bignumber.js';
import { format } from 'date-fns';
import { useHistory } from 'react-router';
import { fromWei } from 'web3-utils';
import { Spinner } from '~/components/Common/Spinner/Spinner';
import NoMatch from '~/components/Routes/NoMatch/NoMatch';
import { useFundOverviewQuery } from './FundOverview.query';
import * as S from './FundOverview.styles';

export const FundOverview: React.FC = () => {
  const history = useHistory();
  const overviewQuery = useFundOverviewQuery();
  if (overviewQuery.loading) {
    return <Spinner positioning="centered" size="large" />;
  }

  const overviewData = overviewQuery && overviewQuery.data && overviewQuery.data.funds;
  if (!overviewData) {
    return <NoMatch />;
  }

  return (
    <S.Table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Share price</th>
          <th>Assets under management</th>
          <th>Inception date</th>
        </tr>
      </thead>
      <tbody>
        {overviewData.map(fund => (
          <S.BodyRow onClick={() => history.push(`/fund/${fund.id}`)}>
            <S.BodyCell>{fund.name}</S.BodyCell>
            <S.BodyCell>{new BigNumber(fromWei(fund.sharePrice)).toFixed(4)}</S.BodyCell>
            <S.BodyCell>{new BigNumber(fromWei(fund.totalSupply)).toFixed(4)}</S.BodyCell>
            <S.BodyCell>{fund.createdAt && format(new Date(fund.createdAt * 1000), 'yyyy-MM-dd hh:mm a')}</S.BodyCell>
          </S.BodyRow>
        ))}
      </tbody>
    </S.Table>
  );
};
