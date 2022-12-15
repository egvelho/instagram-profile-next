import type { GetServerSideProps } from "next";
import { getServerSession } from "src/auth/getServerSession";
import * as userRepository from "src/user/userRepository";

type ProfilePageProps = {
  user: userRepository.User;
};

export default function ProfilePage({
  user: { id, name, surname, email },
}: ProfilePageProps) {
  return (
    <div className="profile-page">
      <div className="profile-view">
        <h2>Perfil de {name}</h2>
        <div className="profile-item">
          <strong>ID:</strong> {id}
        </div>
        <div className="profile-item">
          <strong>Nome:</strong> {name} {surname}
        </div>
        <div className="profile-item">
          <strong>Email:</strong> {email}
        </div>
      </div>
      <style jsx>{`
        .profile-page {
          margin-top: 32px;
        }

        .profile-view {
          margin: 16px 0;
        }

        .profile-item {
          padding-top: 8px;
        }
      `}</style>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<ProfilePageProps> = async ({
  req,
  res,
}) => {
  const session = await getServerSession(req, res);
  const user = (await userRepository.findById(session?.user.userId as number, {
    select: {
      id: true,
      name: true,
      surname: true,
      email: true,
    },
  })) as userRepository.User;
  return { props: { user } };
};
