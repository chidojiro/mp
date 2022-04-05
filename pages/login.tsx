import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Login } from '@/components/Login';

const LoginPage = () => {
  return <Login />;
};

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'login'])),
  },
});

export default LoginPage;
