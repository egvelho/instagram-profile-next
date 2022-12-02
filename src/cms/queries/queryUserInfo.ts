import { gql } from "src/apolloClient";

export const queryUserInfo = gql`
  query {
    userInfo {
      data {
        attributes {
          name
          username
          role
          bio
          link
          avatar {
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
