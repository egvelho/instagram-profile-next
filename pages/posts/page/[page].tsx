import type { GetStaticPaths, GetStaticProps } from "next";
import { Head } from "src/components/Head";
import { Feed, FeedProps } from "src/components/Feed";
import { apolloClient } from "src/cms/apolloClient";
import { decodePagination } from "src/cms/decoders/decodePagination";
import { queryPostPageCount } from "src/cms/queries/queryPostPageCount";
import { getPostPage } from "src/cms/getPostPage";
import { mapPostsToFeedItems } from "src/cms/mapPostsToFeedItems";

export type PostPageProps = {
  posts: FeedProps["items"];
  pagination: FeedProps["pagination"];
};

export type PostPageQuery = {
  page: string;
};

export default function PostPage({ posts, pagination }: PostPageProps) {
  const title = `Página ${pagination?.currentPage} de ${pagination?.pageCount}`;
  return (
    <div className="post-page">
      <Head title={title} />
      <h1 className="title">{title}</h1>
      <Feed items={posts} pagination={pagination} />
      <style jsx>{`
        .title {
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
  const props = await getPostPageProps(Number(params?.page ?? 1));
  return {
    props,
  };
};

export const getStaticPaths: GetStaticPaths<PostPageQuery> = async () => {
  const { data } = await apolloClient.query({
    query: queryPostPageCount,
  });
  const { pageCount } = decodePagination(data);
  const postsPage: string[] = Array.from({ length: pageCount }, (_, index) =>
    (index + 1).toString()
  );

  return {
    paths: postsPage.map((page) => ({ params: { page } })),
    fallback: false,
  };
};

async function getPostPageProps(page: number): Promise<PostPageProps> {
  const results = await getPostPage(page);
  const posts = mapPostsToFeedItems(results.posts);

  const { pageCount, page: currentPage } = results.pagination;

  const pagination = {
    currentPage,
    pageCount,
    hasNextPage: pageCount > currentPage,
    hasPreviousPage: currentPage > 1,
  };

  return { posts, pagination };
}
