import React from 'react';

import { GetStaticProps, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import axios, { AxiosError } from 'axios';

import { Form } from '@/components/common/Form';
import { Layout } from '@/components/Layout';
import { Section } from '@/components/Section';
import { Button } from '@/components/common/Button';
import { ChangePasswordPayload } from '@/types';
import { ProfileApis } from '@/apis/profile';
import { Logger } from '@/utils/Logger';

export const getStaticProps: GetStaticProps = async ({ locale = 'ja' }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common', 'account'])),
    },
  };
};

const Password: NextPage = () => {
  const { t } = useTranslation('account');
  const { t: tCommon } = useTranslation('common');
  const router = useRouter();

  const methods = useForm<ChangePasswordPayload>();
  Logger.log('form:', methods.formState.errors);

  const passwordRules = {
    required: {
      value: true,
      message: tCommon('validation.field.required'),
    },
    minLength: {
      value: 8,
      message: tCommon('validation.field.minLength', { value: 8 }),
    },
    maxLength: {
      value: 48,
      message: tCommon('validation.field.maxLength', { value: 48 }),
    },
  };
  const onSubmit = async (data: ChangePasswordPayload) => {
    if (data.newPassword !== data.newPasswordConfirmation) {
      alert('confirm password is incorrect');
    }

    try {
      await ProfileApis.changePassword({
        newPassword: data.newPassword,
        oldPassword: data.oldPassword,
      });
      await router.push({ pathname: '/account', query: { success: 'password' } });
    } catch (e) {
      console.error('error:', JSON.stringify(e));
      if (axios.isAxiosError(e)) {
        const axiosError = e as AxiosError;
        if (axiosError.response?.status === 400) {
          methods.setError('oldPassword', { message: t('oldPassword.incorrect') });
        }
      }
      // TODO: show error message
    }
  };
  return (
    <Layout title={t('accountSettings')}>
      <Form methods={methods} onSubmit={onSubmit}>
        <h3 className='mb-2'>{t('passwordChange')}</h3>
        <Section>
          <Section.Title>{t('oldPassword')}</Section.Title>
          <Section.Content className='flex items-center justify-between'>
            <Form.PasswordInput
              name='oldPassword'
              className='w-[480px]'
              autoComplete='current-password'
              rules={passwordRules}
            />
            <Form.ErrorMessage name='oldPassword' />
          </Section.Content>
        </Section>
        <Section>
          <Section.Title>{t('newPassword')}</Section.Title>
          <Section.Content className='flex items-center justify-between'>
            <Form.PasswordInput
              name='newPassword'
              autoComplete='new-password'
              className='w-[480px]'
              rules={passwordRules}
            />
            <Form.ErrorMessage name='newPassword' />
          </Section.Content>
        </Section>
        <Section>
          <Section.Title>{t('newPasswordConfirmation')}</Section.Title>
          <Section.Content className='flex items-center justify-between'>
            <Form.PasswordInput
              name='newPasswordConfirmation'
              autoComplete='new-password'
              className='w-[480px]'
              rules={passwordRules}
            />
            <Form.ErrorMessage name='newPasswordConfirmation' />
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
