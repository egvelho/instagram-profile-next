import { useCallback } from "react";
import { useLazyQuery } from "src/cms/apolloClient";
import { debounce } from "lodash";
import { querySearchPosts } from "../queries/querySearchPosts";
import { decodePosts } from "../decoders/decodePosts";

type QueryVariables = {
  searchInput: string;
};

export function useSearchPosts() {
  const [rawSearchPosts, { data, loading }] = useLazyQuery<any, QueryVariables>(
    querySearchPosts
  );
  const searchPosts = useCallback(debounce(rawSearchPosts, 1000), []);
  const { posts } = decodePosts(data);
  return { searchPosts, posts, loading };
}
