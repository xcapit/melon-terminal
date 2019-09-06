import { createAsyncIterator, forAwaitEach, isAsyncIterable } from 'iterall';
import { getMainDefinition } from 'apollo-utilities';
import {
  ApolloLink,
  FetchResult,
  Observable,
} from 'apollo-link';
import { loader } from 'graphql.macro';
import { execute, subscribe, GraphQLSchema, DocumentNode } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';
import * as resolvers from './resolvers';

export interface SchemaLinkOptions<TRoot = any, TContext = any> {
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

export const createSchemaLink = (options: SchemaLinkOptions) => {
  return new ApolloLink(request => {
    return new Observable<FetchResult>(observer => {
      const executor: Executor = isSubscription(request.query)
        ? subscribe
        : execute;

      const context =
        typeof options.context === 'function'
          ? options.context(request)
          : options.context;

      const result = (executor as any)(
        options.schema,
        request.query,
        options.root,
        context,
        request.variables,
        request.operationName,
      );

      (async () => {
        try {
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

export const createSchema = () => makeExecutableSchema({
  resolvers,
  typeDefs: schema,
});
