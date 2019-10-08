import 'graphiql/graphiql.css';

// @ts-ignore
import GraphiQL from 'graphiql';
import React, { useMemo, useContext, Context } from 'react';
import ApolloClient from 'apollo-client';
import { GraphQLRequest, execute } from 'apollo-link';
import { parse } from 'graphql';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import { Maybe } from '~/types';
import * as S from './Playground.styles';

export type RawRequest = GraphQLRequest & {
  query: string;
};

const createFetcher = (client: Maybe<ApolloClient<NormalizedCacheObject>>) => (request: RawRequest) => {
  if (!client) {
    return null;
  }

  return execute(client.link, {
    ...request,
    query: parse(request.query),
  });
};

const useFetcher = (client: Maybe<ApolloClient<NormalizedCacheObject>>) => {
  return useMemo(() => createFetcher(client), [client]);
};

export interface PlaygroundProps {
  context: Context<Maybe<ApolloClient<NormalizedCacheObject>>>;
}

export const Playground: React.FC<PlaygroundProps> = ({ context }) => {
  const client = useContext(context);
  const fetcher = useFetcher(client);

  return client ? (
    <S.Playground>
      <GraphiQL fetcher={fetcher} />
    </S.Playground>
  ) : null;
};

export default Playground;
