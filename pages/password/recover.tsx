import { useEffect } from 'react';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps, GetStaticPropsContext } from 'next';

import { useNavigator } from '@/hooks/useNavigator';
import { useAuth } from '@/hooks/useAuth';
import { PasswordRecoverForm, PublicLayout } from '@/components/Login';

const PasswordResetPage = () => {
  const navigator = useNavigator();
  const auth = useAuth();
  useEffect(() => {
    if (auth.isAuthenticated) {
      navigator.openDashboard();
    }
  }, [navigator, auth]);
  return (
    <PublicLayout>
      <PasswordRecoverForm />
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

export default PasswordResetPage;
