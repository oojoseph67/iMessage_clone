import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import Head from "next/head";
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../chakra/theme';


function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider>
      <Head>
        <title>iMessage App</title>
        <meta name="description" content="iMessage App by mcQu33n" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  );
}

export default MyApp
