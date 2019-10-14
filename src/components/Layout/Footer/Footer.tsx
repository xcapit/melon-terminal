import React from 'react';
import * as R from 'ramda';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import gql from 'graphql-tag';
import { useOnChainQuery } from '~/hooks/useQuery';
import * as S from './Footer.styles';

const FooterQuery = gql`
  query FooterQuery {
    latestPriceFeedUpdate
  }
`;

export const Footer: React.FC = () => {
  const { data } = useOnChainQuery(FooterQuery);
  const update = R.path<Date>(['latestPriceFeedUpdate'], data);

  return (
    <S.FooterPosition>
      <S.Footer>
        <S.FooterItem>
          <Link to="/playground/onchain">NETWORK EXPLORER</Link>
        </S.FooterItem>
        <S.FooterItem>
          <Link to="/playground/thegraph">GRAPH EXPLORER</Link>
        </S.FooterItem>
        {update && <S.FooterItem>Last price feed update at {format(update, 'yyyy-MM-dd hh:mm a')}</S.FooterItem>}
      </S.Footer>
    </S.FooterPosition>
  );
};
