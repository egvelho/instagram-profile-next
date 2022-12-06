import { apolloClient } from "src/cms/apolloClient";
import { decodePosts } from "src/cms/decoders/decodePosts";
import { queryPostPage } from "src/cms/queries/queryPostPage";

export async function getPostPage(page: number) {
  const { data } = await apolloClient.query({
    query: queryPostPage,
    variables: {
      page,
    },
  });
  return decodePosts(data);
}
