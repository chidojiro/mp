import { Layout, Section } from '@/components';
import { useVisibilityControl } from '@/hooks';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

// eslint-disable-next-line no-empty-pattern
const Account = ({}: Props) => {
  const { t } = useTranslation('account');
  const { t: tCommon } = useTranslation('account');
  const router = useRouter();

  const emailSuccessMessageControl = useVisibilityControl();
  const passwordSuccessMessageControl = useVisibilityControl();

  React.useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (router.query.success === 'email') {
      emailSuccessMessageControl.open();

      timeout = setTimeout(() => {
        emailSuccessMessageControl.close();
      }, 2000);

      router.replace('/account');
    } else if (router.query.success === 'password') {
      passwordSuccessMessageControl.open();

      timeout = setTimeout(() => {
        passwordSuccessMessageControl.close();
      }, 2000);

      router.replace('/account');
    }

    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout title={t('accountSettings')}>
      {emailSuccessMessageControl.visible && (
        <div className='mb-5'>{t('emailAddressChangeIsComplete')}</div>
      )}
      {passwordSuccessMessageControl.visible && (
        <div className='mb-5'>{t('passwordChangeHasBeenCompleted')}</div>
      )}
      <Section>
        <Section.Title>{t('emailAddressLoginId')}</Section.Title>
        <Section.Content className='flex items-center justify-between'>
          sample@gmail.com
          <Link href='/account/email'>
            <a className='underline text-primary'>{tCommon('change')}</a>
          </Link>
        </Section.Content>
      </Section>
      <Section>
        <Section.Title>{t('password')}</Section.Title>
        <Section.Content className='flex items-center justify-between'>
          ********
          <Link href='/account/password'>
            <a className='underline text-primary'>{tCommon('change')}</a>
          </Link>
        </Section.Content>
      </Section>
    </Layout>
  );
};

export default Account;

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'account'])),
  },
});
