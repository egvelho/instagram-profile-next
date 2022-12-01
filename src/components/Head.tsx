import NextHead from "next/head";

export type HeadProps = {
  title: string;
};

export function Head({ title }: HeadProps) {
  return (
    <NextHead>
      <title>{title} | Instagram Profile</title>
    </NextHead>
  );
}
