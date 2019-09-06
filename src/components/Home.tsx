import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'graphql.macro';
import styled from 'styled-components';

const Wrapper = styled.div`
  background: red;
`;

const query = gql`
  query BalanceQuery {
    hello
    balance
  }
`;

export const Home = () => {
  const result = useQuery(query);

  return (
    <Wrapper>
      Balance: {result && result.data && result.data.balance}
    </Wrapper>
  );
};
