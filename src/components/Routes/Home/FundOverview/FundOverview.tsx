import React from 'react';
import BigNumber from 'bignumber.js';
import { format } from 'date-fns';
import { useHistory } from 'react-router';
import { fromWei } from 'web3-utils';
import { Spinner } from '~/components/Common/Spinner/Spinner';
import { NoMatch } from '~/components/Routes/NoMatch/NoMatch';
import { useFundOverviewQuery } from '~/queries/FundOverview';
import * as S from './FundOverview.styles';

export const FundOverview: React.FC = () => {
  const history = useHistory();
  const [funds, query] = useFundOverviewQuery();
  if (query.loading) {
    return <Spinner positioning="centered" size="large" />;
  }

  if (!funds) {
    return <NoMatch />;
  }

  return (
    <S.Table>
      <thead>
        <S.HeaderRow>
          <S.HeaderCell>Name</S.HeaderCell>
          <S.HeaderCell>Share price</S.HeaderCell>
          <S.HeaderCell>Assets under management</S.HeaderCell>
          <S.HeaderCell>Inception date</S.HeaderCell>
        </S.HeaderRow>
      </thead>
      <tbody>
        {funds.map(fund => (
          <S.BodyRow key={fund.id} onClick={() => history.push(`/fund/${fund.id}`)}>
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
