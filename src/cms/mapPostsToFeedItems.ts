import { PostsData } from "./decoders/decodePosts";

export function mapPostsToFeedItems(posts: PostsData["posts"]) {
  return posts.map(({ image, slug, title }) => ({
    image,
    link: `/posts/${slug}`,
    title,
  }));
}
