import { GetServerSideProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import { PublicLayout } from '@/components/Login';
import { NewPasswordForm } from '@/components/Login/NewPasswordForm';
import { AuthApi } from '@/apis/auth';
import { Logger } from '@/utils';

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
  Logger.log('token:', token);
  const response = await AuthApi.verifyToken(token as string);
  if (!response) {
    Logger.log('invalid token');
    return {
      props: {
        error: 'message.invalidToken',
        ...(await serverSideTranslations(locale, ['common', 'login'])),
      },
    };
  }
  return {
    props: {
      token,
      ...(await serverSideTranslations(locale, ['common', 'login'])),
    },
  };
};
type Props = {
  token: string;
  error?: string;
};
export const Reset: NextPage<Props> = ({ token, error }) => {
  const { t } = useTranslation('login');
  return (
    <PublicLayout>
      {!!error && <div>{t(error)}</div>}
      {!error && <NewPasswordForm token={token} />}
    </PublicLayout>
  );
};

export default Reset;
