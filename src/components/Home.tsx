import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'graphql.macro';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 20px;
`;

const Item = styled.div`
  margin: 20px 0;
`;

const Title = styled.h2`
  font-weight: bold;
`;

const query = gql`
  query BalanceQuery {
    balances
    accounts
    network
  }
`;

interface QueryData {
  balances: number[];
  accounts: string[];
  network: string;
}

export const Home = () => {
  const { data } = useQuery<QueryData>(query);

  return (
    <Wrapper>
      <Item>
        <Title>Network</Title>
        <div>{data && data.network}</div>
      </Item>

      <Item>
        <Title>Accounts</Title>
        <ul>
          {data && data.accounts && data.accounts.map((account) => (
            <li key={account}>{account}</li>
          ))}
        </ul>
      </Item>

      <Item>
        <Title>Balances</Title>
        <ul>
          {data && data.balances && data.balances.map((balance, index) => (
            <li key={index}>{balance}</li>
          ))}
        </ul>
      </Item>
    </Wrapper>
  );
};
