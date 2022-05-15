import { AuthApis } from '@/auth/apis';
import { NewPasswordForm } from '@/auth/NewPasswordForm';
import { PublicLayout } from '@/layout/PublicLayout';
import { Logger } from '@/common/utils';
import { GetServerSideProps, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

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
  const response = await AuthApis.verifyToken(token as string);
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
