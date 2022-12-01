import type { GetStaticPaths, GetStaticProps } from "next";
import { Head } from "src/components/Head";
import { apolloClient, gql } from "src/apolloClient";
import { Feed, FeedProps } from "src/components/Feed";

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
  const result = await apolloClient.query({
    query: gql`
      query {
        posts(pagination: { pageSize: 9, page: ${params?.page ?? 1} }) {
          meta {
            pagination {
              page
              pageCount
            }
          }
          data {
            attributes {
              title
              slug
              image {
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
    `,
  });

  const posts: FeedProps["items"] = result.data.posts.data.map(
    ({
      attributes: {
        title,
        slug,
        image: {
          data: {
            attributes: { url: image },
          },
        },
      },
    }: any) => ({
      image: `https://webservices.jumpingcrab.com${image}`,
      link: `/posts/${slug}`,
      title,
    })
  );

  const { page: currentPage, pageCount } = result.data.posts.meta.pagination;

  return {
    props: {
      posts,
      pagination: {
        currentPage,
        pageCount,
        hasNextPage: pageCount > currentPage,
        hasPreviousPage: currentPage > 1,
      },
    },
  };
};

export const getStaticPaths: GetStaticPaths<PostPageQuery> = async () => {
  const result = await apolloClient.query({
    query: gql`
      query {
        posts(pagination: { pageSize: 9, page: 1 }) {
          meta {
            pagination {
              pageCount
            }
          }
        }
      }
    `,
  });

  const {
    data: {
      posts: {
        meta: {
          pagination: { pageCount },
        },
      },
    },
  } = result;
  const postsPage: string[] = Array.from({ length: pageCount }, (_, index) =>
    (index + 1).toString()
  );

  return {
    paths: postsPage.map((page) => ({ params: { page } })),
    fallback: false,
  };
};
