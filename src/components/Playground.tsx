import 'graphiql/graphiql.css';

import React, { useMemo } from 'react';
import styled from 'styled-components';
// @ts-ignore
import GraphiQL from 'graphiql';
import { GraphQLRequest, execute } from 'apollo-link';
import { parse } from 'graphql';
import ApolloClient from 'apollo-client';
import { useApolloClient } from '@apollo/react-hooks';

const Wrapper = styled.div`
  height: 100vh;
`;

export type RawRequest = GraphQLRequest & {
  query: string;
};

const useFetcher = (client: ApolloClient<any>) => {
  const fetcher = useMemo(() => (request: RawRequest) => {
    return execute(client.link, {
      ...request,
      query: parse(request.query),
    });
  }, [client]);

  return fetcher;
};

export const Playground = () => {
  const client = useApolloClient();
  const fetcher = useFetcher(client);

  return (
    <Wrapper>
      <GraphiQL fetcher={fetcher} />
    </Wrapper>
  );
};

export default Playground;
