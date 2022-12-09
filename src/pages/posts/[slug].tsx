import type { GetStaticPaths, GetStaticProps } from "next";
import { useLatestPosts } from "src/cms/hooks/useLatestPosts";
import { apolloClient } from "src/cms/apolloClient";
import { PostView, PostViewProps } from "src/components/PostView";
import { Feed } from "src/components/Feed";
import { Head } from "src/components/Head";
import { processMarkdown } from "src/cms/processMarkdown";
import { queryPostsSlugs } from "src/cms/queries/queryPostsSlugs";
import { decodePosts } from "src/cms/decoders/decodePosts";
import { queryPostsBySlug } from "src/cms/queries/queryPostsBySlug";

export type PostPageProps = {
  title: string;
} & PostViewProps;

export type PostPageQuery = {
  slug: string;
};

export default function PostPage(props: PostPageProps) {
  const { posts, loading } = useLatestPosts();

  return (
    <div className="post-page">
      <Head title={props.title} />
      <PostView {...props} />
      <div className="latest-posts">{!loading && <Feed items={posts} />}</div>
      <style jsx>{`
        .latest-posts {
          margin-top: 32px;
        }
      `}</style>
    </div>
  );
}

export const getStaticProps: GetStaticProps<
  PostPageProps,
  PostPageQuery
> = async ({ params }) => {
  const { data } = await apolloClient.query({
    query: queryPostsBySlug,
    variables: {
      slug: params?.slug,
    },
  });

  const {
    posts: [post],
  } = decodePosts(data);
  const content = await processMarkdown(post.content);

  return {
    props: {
      ...post,
      content,
    },
  };
};

export const getStaticPaths: GetStaticPaths<PostPageQuery> = async () => {
  const { data } = await apolloClient.query({
    query: queryPostsSlugs,
  });

  const { posts } = decodePosts(data);
  const paths = posts.map(({ slug }) => ({ params: { slug } }));
  return {
    paths,
    fallback: false,
  };
};
