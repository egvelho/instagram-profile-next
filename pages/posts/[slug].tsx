import type { GetStaticPaths, GetStaticProps } from "next";
import { apolloClient, gql } from "src/apolloClient";
import { PostView, PostViewProps } from "src/components/PostView";
import { Head } from "src/components/Head";
import { remark } from "remark";
import html from "remark-html";

export type PostPageProps = {
  title: string;
} & PostViewProps;

export type PostPageQuery = {
  slug: string;
};

export default function PostPage(props: PostPageProps) {
  return (
    <div className="post-page">
      <Head title={props.title} />
      <PostView {...props} />
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
        posts(filters: {
          slug: {
            eq: "${params?.slug ?? ``}"
          }
        }) {
          data {
            attributes {
              title
              author
              slug
              content
              publishDate
              avatar {
                data {
                  attributes {
                    url
                  }
                }
              }
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

  const {
    attributes: {
      author: authorUsername,
      content,
      publishDate,
      title,
      image: {
        data: {
          attributes: { url: imageUrl },
        },
      },
      avatar: {
        data: {
          attributes: { url: avatarUrl },
        },
      },
    },
  } = result.data.posts.data[0];

  return {
    props: {
      title,
      image: `https://webservices.jumpingcrab.com${imageUrl}`,
      authorAvatar: `https://webservices.jumpingcrab.com${avatarUrl}`,
      publishDate,
      authorUsername,
      content: (await remark().use(html).process(content)).toString(),
    },
  };
};

export const getStaticPaths: GetStaticPaths<PostPageQuery> = async () => {
  const result = await apolloClient.query({
    query: gql`
      query {
        posts {
          data {
            attributes {
              slug
            }
          }
        }
      }
    `,
  });

  const {
    data: {
      posts: { data: postsSlugs },
    },
  } = result;

  const slugs: string[] = postsSlugs.map(
    ({ attributes: { slug } }: any) => slug
  );

  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
};
