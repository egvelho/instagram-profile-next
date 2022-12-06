import { ApolloClient, InMemoryCache } from "@apollo/client";
export { gql, ApolloProvider, useQuery, useLazyQuery } from "@apollo/client";
export type { ApolloQueryResult } from "@apollo/client";

export const serverUrl = "https://webservices.jumpingcrab.com";

export const apolloClient = new ApolloClient({
  ssrMode: true,
  uri: `${serverUrl}/graphql`,
  cache: new InMemoryCache(),
});
