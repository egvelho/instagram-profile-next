import { GetServerSideProps } from "next";
import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export type UsersPageProps = {
  users: User[];
};

export default function UsersPage({ users }: UsersPageProps) {
  return (
    <div>
      {users.map(({ email, id, name }) => (
        <div>
          Name {name}
          <br />
          Id {id}
          <br />
          Email {email}
          <br />
          <br />
        </div>
      ))}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<
  UsersPageProps
> = async () => {
  const users = await prisma.user.findMany();
  return {
    props: {
      users,
    },
  };
};
