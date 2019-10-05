import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
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
    network
    block
    accounts {
      id
      address
      balance
    }
  }
`;

interface QueryData {
  balances: number[];
  accounts: {
    id: string;
    address: string;
    balance: number;
  }[];
  network: string;
  block: number;
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
        <Title>Block number</Title>
        <div>{data && data.block}</div>
      </Item>

      <Item>
        <Title>Accounts</Title>
        <ul>
          {data && data.accounts && data.accounts.map((account) => (
            <li key={account.id}>{account.address}: {account.balance} ETH</li>
          ))}
        </ul>
      </Item>
    </Wrapper>
  );
};

export default Home;
