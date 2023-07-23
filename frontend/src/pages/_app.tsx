import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ChakraProvider, Toast } from "@chakra-ui/react";
import { theme } from "../chakra/theme";
import { ApolloProvider } from "@apollo/client";
import { client } from "../graphql/apollo-client";
import { Toaster } from "react-hot-toast"

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <SessionProvider>
        <Head>
          <title>iMessage App</title>
          <meta name="description" content="iMessage App by mcQu33n" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
          <Toaster/>
        </ChakraProvider>
      </SessionProvider>
    </ApolloProvider>
  );
}

export default MyApp;
