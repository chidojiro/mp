import { useEffect } from 'react';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import dynamic from 'next/dynamic';
import { GetStaticProps, GetStaticPropsContext } from 'next';

import { LoginProps } from '@/components/Login/Login.types';
import { useNavigator } from '@/hooks/useNavigator';
import { useAuth } from '@/hooks/useAuth';

const Login = dynamic<LoginProps>(() => import('@/components/Login').then(module => module.Login));

const LoginPage = () => {
  const navigator = useNavigator();
  const auth = useAuth();
  useEffect(() => {
    if (auth.isAuthenticated) {
      navigator.openDashboard();
    }
  }, []);
  return <Login />;
};

export const getStaticProps: GetStaticProps = async ({ locale = 'ja' }: GetStaticPropsContext) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'login'])),
    },
  };
};

export default LoginPage;
