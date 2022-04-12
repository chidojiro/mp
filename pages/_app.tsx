import React from 'react';

import { appWithTranslation } from 'next-i18next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { SWRConfig } from 'swr';
import '../styles/globals.css';
import { useRouter } from 'next/router';

import { useAuth } from '@/hooks/useAuth';

function CustomApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const auth = useAuth();
  const [authorized, setAuthorized] = React.useState(false);
  React.useEffect(() => {
    function authCheck(url: string) {
      // redirect to login page if accessing a private page and not logged in
      const publicPaths = ['/login'];
      const path = url.split('?')[0];
      if (!publicPaths.includes(path)) {
        if (auth.isAuthenticated) {
          setAuthorized(true);
        } else {
          setAuthorized(false);
          router.push({
            pathname: '/login',
          });
        }
      } else {
        setAuthorized(true);
      }
    }

    // run auth check on initial load
    authCheck(router.asPath);

    // set authorized to false to hide page content while changing routes
    const hideContent = () => setAuthorized(false);
    router.events.on('routeChangeStart', hideContent);

    // run auth check on route change
    router.events.on('routeChangeComplete', authCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off('routeChangeStart', hideContent);
      router.events.off('routeChangeComplete', authCheck);
    };
  }, [router]);

  return (
    <>
      <Head>
        <title>MP</title>
      </Head>
      <div>
        <SWRConfig value={{ revalidateOnFocus: false }}>
          {authorized ? <Component {...pageProps} /> : null}
        </SWRConfig>
      </div>
    </>
  );
}
export default appWithTranslation(CustomApp);
