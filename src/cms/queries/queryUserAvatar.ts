import { gql } from "src/cms/apolloClient";

export const queryUserAvatar = gql`
  query {
    userInfo {
      data {
        attributes {
          name
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
