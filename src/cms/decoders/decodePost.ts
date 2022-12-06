import { getImageUrl } from "src/cms/getImageUrl";

export type PostData = {
  authorAvatar: string;
  image: string;
  authorUsername: string;
  slug: string;
  publishDate: string;
  title: string;
  content: string;
};

export function decodePost(data: any): PostData {
  const baseData = data ? data.post ?? data : undefined;
  const {
    attributes: {
      author: authorUsername = "",
      content = "",
      publishDate = "",
      title = "",
      slug = "",
    },
  } = baseData ?? { attributes: {} };

  const authorAvatar =
    baseData && baseData.attributes.avatar
      ? getImageUrl(baseData.attributes.avatar.data.attributes.url)
      : "/avatar.jpeg";

  const image =
    baseData && baseData.attributes.image
      ? getImageUrl(baseData.attributes.image.data.attributes.url)
      : "/empty.jpg";

  return {
    authorUsername,
    authorAvatar,
    content,
    publishDate,
    title,
    slug,
    image,
  };
}
