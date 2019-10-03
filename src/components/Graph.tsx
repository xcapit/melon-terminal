import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'graphql.macro';
import styled from 'styled-components';
import { TheGraphContext } from './ConnectionProvider/ConnectionProvider';

const Wrapper = styled.div`
  margin: 20px;
`;

const query = gql`
  query FundsQuery {
    funds {
      id
      name
    }
  }
`;

interface QueryData {
  funds: {
    id: string;
    name: string;
  }[];
}

export const Graph = () => {
  const graph = useContext(TheGraphContext);
  const { data } = useQuery<QueryData>(query, {
    client: graph as any,
    skip: !graph,
  });

  return (
    <Wrapper>
      <ul>
        {data && data.funds && data.funds.map(fund => (
          <li key={fund.id}>{fund.name}</li>
        ))}
      </ul>
    </Wrapper>
  );
};
