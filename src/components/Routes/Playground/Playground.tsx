import 'graphiql/graphiql.css';

// @ts-ignore
import GraphiQL from 'graphiql';
import React, { useMemo, useContext, Context } from 'react';
import styled from 'styled-components';
import ApolloClient from 'apollo-client';
import { GraphQLRequest, execute } from 'apollo-link';
import { parse } from 'graphql';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import { Maybe } from '../../../types';

const Wrapper = styled.div`
  height: 100vh;
`;

export type RawRequest = GraphQLRequest & {
  query: string;
};

const useFetcher = (client: Maybe<ApolloClient<NormalizedCacheObject>>) => {
  const fetcher = useMemo(() => (request: RawRequest) => client ? execute(client.link, {
    ...request,
    query: parse(request.query),
  }) : null, [client]);

  return fetcher;
};

export interface PlaygroundProps {
  context: Context<Maybe<ApolloClient<NormalizedCacheObject>>>
}

export const Playground: React.FC<PlaygroundProps> = ({ context }) => {
  const client = useContext(context);
  const fetcher = useFetcher(client);

  return client ? (
    <Wrapper>
      <GraphiQL fetcher={fetcher} />
    </Wrapper>
  ) : null;
};

export default Playground;
