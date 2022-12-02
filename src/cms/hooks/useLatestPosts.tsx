import { useQuery } from "src/apolloClient";
import { queryLatestPosts } from "../queries/queryLatestPosts";
import { decodePosts } from "../decoders/decodePosts";
import { mapPostsToFeedItems } from "../functions/mapPostsToFeedItems";

export function useLatestPosts() {
  const { data, loading } = useQuery(queryLatestPosts);
  const results = decodePosts(data);
  const posts = mapPostsToFeedItems(results.posts);
  return { posts, loading };
}
