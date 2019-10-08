import React from 'react';
import * as S from './Home.styles';
import { FundOverview } from './FundOverview/FundOverview';

export const Home = () => (
  <>
    {/* <S.HomeHeader></S.HomeHeader> */}
    <S.HomeBody>
      <FundOverview />
    </S.HomeBody>
  </>
);

export default Home;
