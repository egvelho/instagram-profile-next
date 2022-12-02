import NextHead from "next/head";

export type HeadProps = {
  title: string;
};

export function Head({ title }: HeadProps) {
  const metaTitle = `${title} | Instagram Profile`;
  return (
    <NextHead>
      <title>{metaTitle}</title>
    </NextHead>
  );
}
