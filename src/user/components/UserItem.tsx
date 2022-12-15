import type { User } from "src/user/userRepository";
import { Avatar } from "src/components/Avatar";

type UserItemProps = {
  user: User;
};

export function UserItem({ user }: UserItemProps) {
  const fullName = `${user.name} ${user.surname}`;
  return (
    <div className="user-item">
      <Avatar name={fullName} alt="" size={36} />
      <span className="user-item-name">{fullName}</span>
      <style jsx>{`
        .user-item {
          display: flex;
          align-items: center;
          padding: 10px;
        }

        .user-item-name {
          font-size: 16px;
          margin-left: 8px;
        }
      `}</style>
    </div>
  );
}
