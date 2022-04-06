import React from 'react';

import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import { Button, Form, Layout, Section } from '@/components';
import { SSR } from '@/ssr';

export const getServerSideProps = SSR.withProps('profile')(async ({ locale }, result) => {
  return {
    ...result,
    props: {
      ...result.props,
      ...(await serverSideTranslations(locale!, ['common', 'account'])),
    },
  };
});

const Password = (props: any) => {
  const { t } = useTranslation('account');
  const router = useRouter();

  const methods = useForm();

  return (
    <Layout title={t('accountSettings')}>
      <Form
        methods={methods}
        onSubmit={() => {
          router.push({ pathname: '/account', query: { success: 'password' } });
        }}
      >
        <h3 className='mb-2'>{t('passwordChange')}</h3>
        <Section>
          <Section.Title>{t('oldPassword')}</Section.Title>
          <Section.Content className='flex items-center justify-between'>
            <Form.PasswordInput
              name='oldPassword'
              className='w-[480px]'
              rules={{ required: true }}
            />
          </Section.Content>
        </Section>
        <Section>
          <Section.Title>{t('newPassword')}</Section.Title>
          <Section.Content className='flex items-center justify-between'>
            <Form.PasswordInput
              name='newPassword'
              className='w-[480px]'
              rules={{ required: true }}
            />
          </Section.Content>
        </Section>
        <Section>
          <Section.Title>{t('newPasswordConfirmation')}</Section.Title>
          <Section.Content className='flex items-center justify-between'>
            <Form.PasswordInput
              name='newPasswordConfirmation'
              className='w-[480px]'
              rules={{ required: true }}
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
  );
};

export default Password;
