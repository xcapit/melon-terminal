import LRUCache from 'lru-cache';
import { forAwaitEach } from 'iterall';
import { execute, subscribe, GraphQLSchema, ExecutionArgs } from 'graphql';
import { ApolloLink, FetchResult, Observable, Operation } from 'apollo-link';
import { makeExecutableSchema } from 'graphql-tools';
import { Environment } from '@melonproject/melonjs';
import { NetworkEnum } from '~/types';
import { Connection } from '~/components/Contexts/Connection';
import { isSubscription } from '~/graphql/utils/isSubscription';
import { ensureIterable } from '~/graphql/utils/ensureIterable';
import * as loaderCreators from '~/graphql/loaders';
import * as resolvers from '~/graphql/resolvers';
// @ts-ignore
import schema from '~/graphql/schema.graphql';

export type Resolver<TParent = any, TArgs = any> = (parent: TParent, args: TArgs, context: Context) => any;
export type ContextCreator = (request: Operation) => Promise<Context> | Context;
export type Loaders = {
  [K in keyof typeof loaderCreators]: ReturnType<typeof loaderCreators[K]>;
};

export interface Context {
  cache: LRUCache<string, any>;
  environment: Environment;
  loaders: Loaders;
  block: number;
  accounts?: string[];
  network?: NetworkEnum;
}

interface SchemaLinkOptions<TRoot = any, TContext = any> {
  schema: GraphQLSchema;
  context: TContext;
  root?: TRoot;
}

export const createQueryContext = (connection: Connection): ContextCreator => {
  const cache = new LRUCache<string, any>(500);

  return async () => {
    // Create a reference to the loaders object so we can create the loader
    // functions with the pre-initialized context object.
    const environment = new Environment(connection.eth, {
      cache,
    });

    const block = await connection.eth.getBlockNumber();
    const loaders = {} as Loaders;
    const context: Context = {
      cache,
      block,
      loaders,
      environment,
      accounts: connection.accounts,
      network: connection.network,
    };

    Object.keys(loaderCreators).forEach(key => {
      // @ts-ignore
      loaders[key] = loaderCreators[key](context);
    });

    return context;
  };
};

export const createSchema = () => {
  return makeExecutableSchema({
    resolvers,
    typeDefs: schema,
    inheritResolversFromInterfaces: true,
  });
};

export const createSchemaLink = <TRoot = any>(options: SchemaLinkOptions<TRoot, ContextCreator>) => {
  const handleRequest = async (request: Operation, observer: any) => {
    try {
      const context: Context = await options.context(request);
      const args: ExecutionArgs = {
        schema: options.schema,
        rootValue: options.root,
        contextValue: context,
        variableValues: request.variables,
        operationName: request.operationName,
        document: request.query,
      };

      const result = isSubscription(request.query) ? subscribe(args) : execute(args);
      const iterable = ensureIterable(await result) as AsyncIterable<any>;
      await forAwaitEach(iterable, (value: any) => observer.next(value));
      observer.complete();
    } catch (error) {
      observer.error(error);
    }
  };

  const createObservable = (request: Operation) => {
    return new Observable<FetchResult>(observer => {
      handleRequest(request, observer);
    });
  };

  return new ApolloLink(request => createObservable(request));
};
