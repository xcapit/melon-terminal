import ApolloClient, { ObservableQuery } from 'apollo-client';
import { NormalizedCache } from 'apollo-cache-inmemory';

export function refetchQueries(client: ApolloClient<NormalizedCache>, names: string[]) {
  const refetch: ObservableQuery[] = [];
  const manager = client.queryManager as any;
  (manager.queries as Map<any, any>).forEach(query => {
    const observable = query.observableQuery as ObservableQuery;
    if (observable && observable.queryName && names.includes(observable.queryName)) {
      refetch.push(observable);
    }
  });

  return Promise.all(refetch.map(query => query.refetch()));
}
