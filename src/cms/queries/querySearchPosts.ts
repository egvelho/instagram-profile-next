import { gql } from "src/cms/apolloClient";

export const querySearchPosts = gql`
  query SearchPosts($searchInput: String!) {
    posts(
      filters: {
        or: [
          {
            title: { containsi: $searchInput }
            content: { containsi: $searchInput }
          }
        ]
      }
      pagination: { limit: 6 }
      sort: ["updatedAt"]
    ) {
      data {
        attributes {
          title
          slug
        }
      }
    }
  }
`;
