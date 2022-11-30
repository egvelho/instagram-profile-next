import type { GetStaticProps } from "next";
import {
  ProfileHeader,
  ProfileHeaderProps,
} from "../src/components/ProfileHeader";
import { apolloClient, gql } from "../src/apolloClient";
import { Feed, FeedProps } from "../src/components/Feed";

export type HomeProps = {
  posts: FeedProps["items"];
  pagination: FeedProps["pagination"];
};

export default function Home({ posts, pagination }: HomeProps) {
  return (
    <article>
      <header>
        <ProfileHeader
          avatar=""
          bio="fsdfsdf"
          link="https://google.com"
          name="Eduardo Velho"
          role="Professor"
          username="egvelho"
          publishCount={10}
        />
      </header>
      <section className="feed-container">
        <Feed items={posts} pagination={pagination} />
      </section>
    </article>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
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
        hasPreviousPage: false,
      },
    },
  };
};
