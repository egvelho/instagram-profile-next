import "../styles/globals.css";
import "../src/layout/styles.css";

import { Layout } from "../src/layout/Layout";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
