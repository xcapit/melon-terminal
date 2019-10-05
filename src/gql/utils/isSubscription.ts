import { DocumentNode } from "graphql";
import { getMainDefinition } from "apollo-utilities";

export const isSubscription = (query: DocumentNode) => {
  const main = getMainDefinition(query);
  return (
    main.kind === 'OperationDefinition' && main.operation === 'subscription'
  );
};
