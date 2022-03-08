import { ServerSidePropsProvider } from '@/contexts';
import { appWithTranslation } from 'next-i18next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import '../styles/globals.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>MP</title>
      </Head>
      <div>
        <ServerSidePropsProvider>
          <Component {...pageProps} />
        </ServerSidePropsProvider>
      </div>
    </>
  );
}
export default appWithTranslation(CustomApp);
