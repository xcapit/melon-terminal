import LRUCache from 'lru-cache';
import { forAwaitEach } from 'iterall';
import { execute, subscribe, GraphQLSchema, ExecutionArgs } from 'graphql';
import { ApolloLink, FetchResult, Observable, Operation } from 'apollo-link';
import { makeExecutableSchema } from 'graphql-tools';
import { Environment } from '@melonproject/melonjs';
import { Connection } from '~/components/Contexts/Connection';
import { isSubscription } from '~/graphql/utils/isSubscription';
import { ensureIterable } from '~/graphql/utils/ensureIterable';
import { NetworkEnum, Deployment } from '~/types';
import * as loaders from '~/graphql/loaders';
import * as resolvers from '~/graphql/resolvers';
// @ts-ignore
import SchemaDefinition from '~/graphql/schema.graphql';
import * as EnumDefinitions from '~/graphql/enums';

export type Resolver<TParent = any, TArgs = any> = (parent: TParent, args: TArgs, context: Context) => any;
export type ContextCreator = (request: Operation) => Promise<Context> | Context;
export type Loaders = {
  [K in keyof typeof loaders]: ReturnType<typeof loaders[K]>;
};

export interface Context {
  cache: LRUCache<string, any>;
  deployment: Deployment;
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
    const deployment = process.env.DEPLOYMENT;
    const environment = new Environment(connection.eth, { cache });
    const block = await connection.eth.getBlockNumber();
    const context: Context = {
      cache,
      deployment,
      block,
      environment,
      accounts: connection.accounts,
      network: connection.network,
      loaders: {} as Loaders,
    };

    Object.keys(loaders).forEach(key => {
      // @ts-ignore
      context.loaders[key] = loaders[key](context);
    });

    return context;
  };
};

export const createSchema = () => {
  const executable = makeExecutableSchema({
    resolvers,
    typeDefs: [...Object.values(EnumDefinitions), SchemaDefinition],
    inheritResolversFromInterfaces: true,
  });

  return executable;
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
