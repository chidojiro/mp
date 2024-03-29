import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';
import { SWRConfig } from 'swr';

import '../styles/globals.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>MP</title>
      </Head>
      <div>
        <SWRConfig value={{ revalidateOnFocus: false }}>
          <Component {...pageProps} />
        </SWRConfig>
      </div>
    </>
  );
}
export default appWithTranslation(CustomApp);
