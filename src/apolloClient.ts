import { ApolloClient, InMemoryCache } from "@apollo/client";
export { gql, ApolloProvider, useQuery, useLazyQuery } from "@apollo/client";
export type { ApolloQueryResult } from "@apollo/client";

const serverUrl = "https://webservices.jumpingcrab.com";

export const apolloClient = new ApolloClient({
  ssrMode: true,
  uri: `${serverUrl}/graphql`,
  cache: new InMemoryCache(),
});

export function getImageUrl(path: string) {
  return `${serverUrl}${path}`;
}
