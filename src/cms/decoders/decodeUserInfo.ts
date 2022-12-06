import { getImageUrl } from "src/cms/getImageUrl";

export type UserInfoData = {
  name: string;
  username: string;
  role: string;
  bio: string;
  link: string;
  avatar: string;
};

export function decodeUserInfo(data: any): UserInfoData {
  const {
    name = "",
    username = "",
    role = "",
    bio = "",
    link = "",
  } = data?.userInfo.data.attributes ?? {};

  const avatar =
    data && data.userInfo.data.attributes.avatar
      ? getImageUrl(data.userInfo.data.attributes.avatar.data.attributes.url)
      : "/avatar.jpeg";

  return {
    name,
    username,
    role,
    bio,
    link,
    avatar,
  };
}
