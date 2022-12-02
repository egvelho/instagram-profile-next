import { gql } from "src/apolloClient";

export const queryPostPageCount = gql`
  query {
    posts(pagination: { pageSize: 9, page: 1 }) {
      meta {
        pagination {
          pageCount
        }
      }
    }
  }
`;
