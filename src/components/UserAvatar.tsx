import { useEffect } from "react";
import { useLazyQuery } from "src/apolloClient";
import { queryUserAvatar } from "src/cms/queries/queryUserAvatar";
import { decodeUserInfo } from "src/cms/decoders/decodeUserInfo";
import { Avatar, AvatarProps } from "src/components/Avatar";

export type UserAvatarProps = Omit<AvatarProps, "src" | "alt">;

export function UserAvatar({ size }: UserAvatarProps) {
  const [getUserAvatar, { data }] = useLazyQuery(queryUserAvatar);
  useEffect(() => {
    getUserAvatar();
  }, []);

  const user = decodeUserInfo(data);
  return <Avatar size={size} alt={user.name} src={user.avatar} />;
}
