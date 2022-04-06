import React from 'react';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import { ProfileApis } from '@/apis';
import { Button, Form, Layout, Section } from '@/components';
import { EmailPattern } from '@/constants';
import { ServerSidePropsProvider } from '@/contexts';
import { useProfile } from '@/hooks';
import { SSR } from '@/ssr';
import { Profile } from '@/types';

export const getServerSideProps = SSR.withProps('profile')(async ({ locale }, result) => {
  return {
    ...result,
    props: {
      ...result.props,
      ...(await serverSideTranslations(locale!, ['common', 'account'])),
    },
  };
});

const Email = (props: any) => {
  const { t } = useTranslation('account');
  const router = useRouter();
  const { data: profile } = useProfile(props.profile);

  const methods = useForm({
    defaultValues: profile,
  });
  const { reset } = methods;

  React.useEffect(() => {
    reset(profile);
  }, [profile, reset]);

  const handleSubmit = async (data: Profile) => {
    await ProfileApis.put(data);

    router.push({ pathname: '/account', query: { success: 'email' } });
  };

  return (
    <ServerSidePropsProvider props={props}>
      <Layout title={t('accountSettings')}>
        <Form methods={methods} onSubmit={handleSubmit}>
          <h3 className='mb-2'>{t('changeEmailAddress')}</h3>
          <Section>
            <Section.Title>{t('emailAddressLoginId')}</Section.Title>
            <Section.Content className='flex items-center justify-between'>
              <Form.Input
                name='email'
                className='w-[480px]'
                rules={{ required: true, pattern: EmailPattern }}
              />
            </Section.Content>
          </Section>
          <div className='flex justify-center gap-5 h-[52px] mt-10'>
            <Link passHref href='/account'>
              <Button colorScheme='negative' className='w-[480px]'>
                {t('stopEditingAndReturn')}
              </Button>
            </Link>
            <Button className='w-[480px]' type='submit'>
              {t('sendConfirmationEmail')}
            </Button>
          </div>
        </Form>
      </Layout>
    </ServerSidePropsProvider>
  );
};

export default Email;
