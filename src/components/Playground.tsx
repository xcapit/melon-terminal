import React, { useMemo } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
// @ts-ignore
import GraphiQL from 'graphiql';
import 'graphiql/graphiql.css';
import { useApolloClient } from '@apollo/react-hooks';
import { GraphQLRequest, execute } from 'apollo-link';
import { parse } from 'graphql';

const GlobalStyles = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
  }
`;

const Wrapper = styled.div`
  height: 100vh;
`;

export type RawRequest = GraphQLRequest & {
  query: string;
};

const useFetcher = () => {
  const client = useApolloClient();
  const fetcher = useMemo(() => (request: RawRequest) => {
    return execute(client.link, {
      ...request,
      query: parse(request.query),
    });
  }, [client]);

  return fetcher;
};

export const Playground = () => {
  const fetcher = useFetcher();

  return (
    <>
      <GlobalStyles />
      <Wrapper>
        <GraphiQL fetcher={fetcher} />
      </Wrapper>
    </>
  );
};
