import { useEffect } from 'react';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps, GetStaticPropsContext } from 'next';

import { PublicLayout, LoginForm } from '@/components/Login';
import { useNavigator } from '@/hooks/useNavigator';
import { useAuth } from '@/hooks/useAuth';

const LoginPage = () => {
  const navigator = useNavigator();
  const auth = useAuth();
  useEffect(() => {
    if (auth.isAuthenticated) {
      navigator.openDashboard();
    }
  }, [navigator, auth]);
  return (
    <PublicLayout>
      <LoginForm />
    </PublicLayout>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale = 'ja' }: GetStaticPropsContext) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'login'])),
    },
  };
};

export default LoginPage;
