import { Profile } from '@/auth/types';
import { Section } from '@/common/Section';
import { useVisibilityControl } from '@/common/useVisibilityControl';
import { PrivateLayout } from '@/layout/PrivateLayout';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

export const getServerSideProps = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common', 'account'])),
    },
  };
};

const Account = (props: any) => {
  const { t } = useTranslation('account');
  const { t: tCommon } = useTranslation();
  const router = useRouter();
  const profile = props.profile as Profile;

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
    <PrivateLayout title={t('accountSettings')}>
      {emailSuccessMessageControl.visible && (
        <div className='mb-5'>{t('emailAddressChangeIsComplete')}</div>
      )}
      {passwordSuccessMessageControl.visible && (
        <div className='mb-5'>{t('passwordChangeHasBeenCompleted')}</div>
      )}
      <Section>
        <Section.Title>{t('emailAddressLoginId')}</Section.Title>
        <Section.Content className='flex items-center justify-between text-medium'>
          {profile.email}
          <Link href='/account/email'>
            <a className='underline text-primary'>{tCommon('change')}</a>
          </Link>
        </Section.Content>
      </Section>
      <Section>
        <Section.Title>{t('password')}</Section.Title>
        <Section.Content className='flex items-center justify-between text-medium'>
          ********
          <Link href='/account/password'>
            <a className='underline text-primary'>{tCommon('change')}</a>
          </Link>
        </Section.Content>
      </Section>
    </PrivateLayout>
  );
};

export default Account;
