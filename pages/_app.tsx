import "src/layout/styles.css";

import { Layout } from "src/layout/Layout";
import { ApolloProvider, apolloClient } from "src/cms/apolloClient";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}
