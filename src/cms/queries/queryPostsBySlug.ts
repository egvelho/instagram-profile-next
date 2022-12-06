import { gql } from "src/cms/apolloClient";

export const queryPostsBySlug = gql`
  query PostsBySlug($slug: String!) {
    posts(filters: { slug: { eq: $slug } }) {
      data {
        attributes {
          title
          author
          slug
          content
          publishDate
          avatar {
            data {
              attributes {
                url
              }
            }
          }
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
