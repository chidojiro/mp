import { GetServerSideProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { PublicLayout } from '@/components/Login';
import { NewPasswordForm } from '@/components/Login/NewPasswordForm';

export const getServerSideProps: GetServerSideProps = async ({
  locale = 'ja',
  query: { token },
}) => {
  // if there is no token, redirect to login page
  if (!token) {
    return {
      redirect: {
        destination: '/login',
      },
      props: {},
    };
  }

  // verify token
  // const response = await AuthApi.verifyToken(token as string);
  // if (!response) {
  //   return {
  //     redirect: {
  //       destination: '/login',
  //     },
  //     props: {},
  //   };
  // }
  return {
    props: {
      token,
      ...(await serverSideTranslations(locale, ['common', 'login'])),
    },
  };
};
type Props = {
  token: string;
};
export const Reset: NextPage<Props> = ({ token }) => {
  return (
    <PublicLayout>
      <NewPasswordForm token={token} />
    </PublicLayout>
  );
};

export default Reset;
