import { PrismaClient, User } from "@prisma/client";
import type { GetStaticPaths, GetStaticProps } from "next";

const prisma = new PrismaClient();

export type UserPageProps = User;

export default function UserPage({ email, id, name }: UserPageProps) {
  return (
    <div>
      Name {name}
      <br />
      Id {id}
      <br />
      Email {email}
      <br />
      <br />
    </div>
  );
}

type UserQuery = {
  id: string;
};

export const getStaticPaths: GetStaticPaths<UserQuery> = async () => {
  const usersIds = await prisma.user.findMany({
    select: {
      id: true,
    },
  });
  return {
    paths: usersIds.map((user) => ({
      params: { id: user.id.toString() },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<UserPageProps, UserQuery> = async ({
  params,
}) => {
  const user = (await prisma.user.findFirst({
    where: {
      id: Number(params?.id),
    },
  })) as User;
  return {
    props: user,
  };
};
