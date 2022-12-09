import "src/layout/styles.css";
import "react-toastify/dist/ReactToastify.css";

import { Layout } from "src/layout/Layout";
import { ApolloProvider, apolloClient } from "src/cms/apolloClient";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <Layout>
        <Component {...pageProps} />
        <ToastContainer />
      </Layout>
    </ApolloProvider>
  );
}
