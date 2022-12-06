import { useEffect } from "react";
import { useLazyQuery } from "src/cms/apolloClient";
import { Avatar, AvatarProps } from "src/components/Avatar";
import { queryUserAvatar } from "../queries/queryUserAvatar";
import { decodeUserInfo } from "../decoders/decodeUserInfo";

export type UserAvatarProps = Omit<AvatarProps, "src" | "alt">;

export function UserAvatar({ size }: UserAvatarProps) {
  const [getUserAvatar, { data }] = useLazyQuery(queryUserAvatar);
  useEffect(() => {
    getUserAvatar();
  }, []);

  const user = decodeUserInfo(data);
  return <Avatar size={size} alt={user.name} src={user.avatar} />;
}
