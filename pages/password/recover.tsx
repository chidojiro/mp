import { PasswordRecoverForm } from '@/auth/PasswordRecoverForm';
import { useAuth } from '@/auth/useAuth';
import { PublicLayout } from '@/layout/PublicLayout';
import { GetStaticProps, GetStaticPropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useHrefs } from '@/navigation/useHrefs';

const PasswordResetPage = () => {
  const router = useRouter();
  const { getDashboardHref } = useHrefs();
  const auth = useAuth();

  useEffect(() => {
    if (auth.isAuthenticated) {
      router.push(getDashboardHref({ organizationId: auth.organizationId }));
    }
  }, [auth, router, getDashboardHref]);

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
