import type { GetStaticProps } from "next";
import { Head } from "src/components/Head";
import {
  ProfileHeader,
  ProfileHeaderProps,
} from "src/components/ProfileHeader";
import { apolloClient, gql } from "src/apolloClient";
import { Feed, FeedProps } from "src/components/Feed";

export type HomeProps = {
  posts: FeedProps["items"];
  pagination: FeedProps["pagination"];
  userInfo: ProfileHeaderProps;
};

export default function Home({ posts, pagination, userInfo }: HomeProps) {
  return (
    <article>
      <Head title="Home" />
      <header>
        <ProfileHeader {...userInfo} />
      </header>
      <section className="feed-container">
        <Feed items={posts} pagination={pagination} />
      </section>
    </article>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const { posts, pagination } = await getPosts();
  const userInfo = await getUserInfo();
  return {
    props: {
      posts,
      pagination,
      userInfo,
    },
  };
};

async function getUserInfo(): Promise<ProfileHeaderProps> {
  const result = await apolloClient.query({
    query: gql`
      query {
        userInfo {
          data {
            attributes {
              name
              username
              role
              bio
              publishCount
              link
              avatar {
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
    name,
    username,
    role,
    bio,
    publishCount,
    link,
    avatar: {
      data: {
        attributes: { url: avatarUrl },
      },
    },
  } = result.data.userInfo.data.attributes;

  return {
    name,
    username,
    role,
    bio,
    publishCount,
    link,
    avatar: `https://webservices.jumpingcrab.com${avatarUrl}`,
  };
}

async function getPosts() {
  const result = await apolloClient.query({
    query: gql`
      query {
        posts(pagination: { pageSize: 9, page: 1 }) {
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

  const { page: currentPage, pageCount } = result.data.posts.meta.pagination;

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

  const pagination = {
    currentPage,
    pageCount,
    hasNextPage: pageCount > currentPage,
    hasPreviousPage: false,
  };

  return { posts, pagination };
}
