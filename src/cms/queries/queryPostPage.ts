import { gql } from "src/cms/apolloClient";

export const queryPostPage = gql`
  query GetPostPage($page: Int!) {
    posts(pagination: { pageSize: ${process.env.NEXT_PUBLIC_PAGINATION}, page: $page }) {
      meta {
        pagination {
          page
          pageCount
          total
        }
      }
      data {
        attributes {
          title
          slug
          image {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;
