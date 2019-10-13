import { useContext } from 'react';
import { useQuery, QueryHookOptions as BaseQueryHookOptions } from '@apollo/react-hooks';
import { OperationVariables, QueryResult } from '@apollo/react-common';
import { DocumentNode } from 'graphql';
import ApolloClient from 'apollo-client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import { OnChainContext, TheGraphContext } from '~/components/Contexts/Connection';

export type QueryHookOptions<TData = any, TVariables = OperationVariables> = BaseQueryHookOptions<TData, TVariables>;

export const useContextQuery = <TData = any, TVariables = OperationVariables>(
  context: ApolloClient<NormalizedCacheObject>,
  query: DocumentNode,
  options?: QueryHookOptions<TData, TVariables>
): QueryResult<TData, TVariables> => {
  return useQuery(query, {
    ...options,
    client: context,
  });
};

export const useOnChainQuery = <TData = any, TVariables = OperationVariables>(
  query: DocumentNode,
  options?: QueryHookOptions<TData, TVariables>
): QueryResult<TData, TVariables> => {
  const context = useContext(OnChainContext);
  const result = useContextQuery<TData, TVariables>(context.client, query, options);

  // In our setup, we swap out the underlying apollo client whenever the user
  // switches their connection provider (frame, metamask, etc.) or when there
  // is a problem with the currently selected connection method (e.g. a network
  // change was detected or the connection breaks up entirely).
  if (result.networkStatus === 8 && result.error && result.error.networkError) {
    if (result.error.message === 'Network error: Store reset while query was in flight (not completed in link chain)') {
      return { ...result, loading: true, data: undefined, error: undefined, networkStatus: 1 };
    }
  }

  return result;
};

export const useTheGraphQuery = <TData = any, TVariables = OperationVariables>(
  query: DocumentNode,
  options?: QueryHookOptions<TData, TVariables>
): QueryResult<TData, TVariables> => {
  const context = useContext(TheGraphContext);
  return useContextQuery<TData, TVariables>(context.client, query, options);
};
