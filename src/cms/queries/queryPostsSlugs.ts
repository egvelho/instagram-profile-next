import { gql } from "src/cms/apolloClient";

export const queryPostsSlugs = gql`
  query {
    posts(pagination: { limit: 10000 }) {
      data {
        attributes {
          slug
        }
      }
    }
  }
`;
