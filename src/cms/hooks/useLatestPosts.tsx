import { useQuery } from "src/cms/apolloClient";
import { queryLatestPosts } from "../queries/queryLatestPosts";
import { decodePosts } from "../decoders/decodePosts";
import { mapPostsToFeedItems } from "../mapPostsToFeedItems";

export function useLatestPosts() {
  const { data, loading } = useQuery(queryLatestPosts);
  const results = decodePosts(data);
  const posts = mapPostsToFeedItems(results.posts);
  return { posts, loading };
}
