import React from 'react';
import styled from 'styled-components';
import { FundOverview } from './FundOverview/FundOverview';

const Wrapper = styled.div`
  margin: 20px;
`;

export const Home = () => {
  return (
    <Wrapper>
      <FundOverview />
    </Wrapper>
  );
};

export default Home;
