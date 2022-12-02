import { remark } from "remark";
import html from "remark-html";

const remarkHtml = remark().use(html);

export async function processMarkdown(content: string) {
  return (await remarkHtml.process(content)).toString();
}
