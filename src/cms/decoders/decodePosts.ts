import { PostData, decodePost } from "./decodePost";
import { PaginationData, decodePagination } from "./decodePagination";

export type PostsData = {
  posts: PostData[];
  pagination: PaginationData;
};

export function decodePosts(data: any): PostsData {
  const rawPosts = data ? data.posts.data : [];
  const posts = rawPosts.map((post: any) => decodePost(post));
  const pagination = decodePagination(data);
  return {
    posts,
    pagination,
  };
}
