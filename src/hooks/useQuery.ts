import { useContext } from 'react';
import { useQuery, QueryHookOptions as BaseQueryHookOptions } from '@apollo/react-hooks';
import { OperationVariables, QueryResult } from '@apollo/react-common';
import { DocumentNode } from 'graphql';
import ApolloClient from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import { Maybe } from '../types';
import { OnChainContext, TheGraphContext } from '../components/Contexts/Connection';

export type QueryHookOptions<TData = any, TVariables = OperationVariables> = BaseQueryHookOptions<TData, TVariables>;

export const useContextQuery = <TData = any, TVariables = OperationVariables>(
  context: Maybe<ApolloClient<NormalizedCacheObject>>,
  query: DocumentNode,
  options?: QueryHookOptions<TData, TVariables>
): QueryResult<TData, TVariables> => {
  // If no options were given or the query was set to "execute" (no skip), then
  // set skip to "true" if the apollo client for TheGraph is not set.
  const skip = !!!options || !options.skip ? !context : options.skip;
  const client = !!context ? (context as ApolloClient<NormalizedCacheObject>) : undefined;

  return useQuery(query, {
    ...options,
    skip,
    client,
  });
};

export const useOnChainQuery = <TData = any, TVariables = OperationVariables>(
  query: DocumentNode,
  options?: QueryHookOptions<TData, TVariables>
): QueryResult<TData, TVariables> => {
  const context = useContext(OnChainContext);
  return useContextQuery<TData, TVariables>(context, query, options);
};

export const useTheGraphQuery = <TData = any, TVariables = OperationVariables>(
  query: DocumentNode,
  options?: QueryHookOptions<TData, TVariables>
): QueryResult<TData, TVariables> => {
  const context = useContext(TheGraphContext);
  return useContextQuery<TData, TVariables>(context, query, options);
};
