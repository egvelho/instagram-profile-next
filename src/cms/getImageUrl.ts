import { serverUrl } from "./apolloClient";

export function getImageUrl(path: string) {
  return `${serverUrl}${path}`;
}
