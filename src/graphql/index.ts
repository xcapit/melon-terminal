import Web3 from 'web3';
import { useMemo } from 'react';
import { createAsyncIterator, forAwaitEach, isAsyncIterable } from 'iterall';
import { loader } from 'graphql.macro';
import { execute, subscribe, GraphQLSchema, DocumentNode } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';
import { getMainDefinition } from 'apollo-utilities';
import { ApolloLink, FetchResult, Observable } from 'apollo-link';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import * as resolvers from './resolvers';
import { Maybe } from '../types';

interface SchemaLinkOptions<TRoot = any, TContext = any> {
  schema: GraphQLSchema;
  root?: TRoot;
  context?: TContext;
}

const schema = loader('./schema.graphql');

const isSubscription = (query: DocumentNode) => {
  const main = getMainDefinition(query);
  return (
    main.kind === 'OperationDefinition' && main.operation === 'subscription'
  );
};

const ensureIterable = (data: any) => {
  if (isAsyncIterable(data)) {
    return data;
  }

  return createAsyncIterator([data]);
};

type Executor = typeof execute | typeof subscribe;

const createSchemaLink = (options: SchemaLinkOptions) => {
  return new ApolloLink(request => {
    return new Observable<FetchResult>(observer => {
      (async () => {
        try {
          const executor: Executor = isSubscription(request.query)
            ? subscribe
            : execute;

          const context = await (typeof options.context === 'function'
            ? options.context(request)
            : options.context);

          const result = (executor as any)(
            options.schema,
            request.query,
            options.root,
            context,
            request.variables,
            request.operationName,
          );

          const iterable = ensureIterable(await result) as AsyncIterable<any>;
          await forAwaitEach(iterable, (value: any) => observer.next(value));
          observer.complete();
        } catch (error) {
          observer.error(error);
        }
      })();
    });
  });
};

const createSchema = () => makeExecutableSchema({
  resolvers,
  typeDefs: schema,
});

export const useApollo = (connection: Maybe<Web3>) => {
  const schema = useMemo(() => createSchema(), []);
  const apollo = useMemo(() => {
    if (!connection) {
      return;
    }

    const link = createSchemaLink({
      schema,
      context: { web3: connection },
    });

    const cache = new InMemoryCache();
    return new ApolloClient({
      link,
      cache,
    });
  }, [schema, connection]);

  return apollo;
};
