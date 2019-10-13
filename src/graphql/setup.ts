import * as Rx from 'rxjs';
import LRU from 'lru-cache';
import { forAwaitEach } from 'iterall';
import { execute, subscribe, GraphQLSchema, ExecutionArgs } from 'graphql';
import { ApolloLink, FetchResult, Observable, Operation } from 'apollo-link';
import { makeExecutableSchema } from 'graphql-tools';
import { Environment } from '@melonproject/melonjs';
import * as loaderCreators from '~/graphql/loaders';
import * as resolvers from '~/graphql/resolvers';
import { isSubscription } from '~/graphql/utils/isSubscription';
import { ensureIterable } from '~/graphql/utils/ensureInterable';
import { Connection } from '~/components/Contexts/Connection';

// @ts-ignore
import schema from '~/graphql/schema.graphql';

export type Resolver<TParent = any, TArgs = any> = (parent: TParent, args: TArgs, context: Context) => any;
export type ContextCreator = (cache: LRU<string, any>, request: Operation) => Promise<Context> | Context;

export type Loaders = {
  [K in keyof typeof loaderCreators]: ReturnType<typeof loaderCreators[K]>;
};

export interface Context {
  environment: Environment;
  network: number;
  block: number;
  loaders: Loaders;
  cache: LRU<string, any>;
}

interface SchemaLinkOptions<TRoot = any, TContext = any> {
  schema: GraphQLSchema;
  context: TContext;
  root?: TRoot;
}

export const createQueryContext = (observable: Rx.Observable<Connection>): ContextCreator => async cache => {
  const { eth, network } = await new Promise<Connection>((resolve, reject) => {
    observable.subscribe(resolve, reject);
  });

  // Create a reference to the loaders object so we can create the loader
  // functions with the pre-initialized context object.
  const loaders = {} as Loaders;
  const block = await eth.getBlockNumber();
  const environment = { eth, deployment: process.env.DEPLOYMENT };
  const context = { network, block, loaders, environment, cache } as Context;

  Object.keys(loaderCreators).forEach(key => {
    // @ts-ignore
    loaders[key] = loaderCreators[key](context);
  });

  return context;
};

export const createSchema = () => {
  return makeExecutableSchema({
    resolvers,
    typeDefs: schema,
    inheritResolversFromInterfaces: true,
  });
};

export const createSchemaLink = <TRoot = any>(options: SchemaLinkOptions<TRoot, ContextCreator>) => {
  // This LRU Cache gives us a cross-request cache bucket for calls on the
  // blockchain. Cache keys should be prefixed with the current block
  // number from the context object.
  const cache = new LRU<string, any>(500);

  const handleRequest = async (request: Operation, observer: any) => {
    try {
      const context: Context = await options.context(cache, request);
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
