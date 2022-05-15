import { Profile } from '@/auth/types';
import { Button } from '@/common/Button';
import { EmailField } from '@/common/EmailField';
import { Form } from '@/common/Form';
import { Section } from '@/common/Section';
import { PrivateLayout } from '@/layout/PrivateLayout';
import { SsrUtils } from '@/ssr/utils';
import { GetServerSideProps, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { ProfileApis } from '@/auth/apis';

export const getServerSideProps: GetServerSideProps = SsrUtils.withProps('profile')(
  async ({ locale = 'ja' }, result) => {
    return {
      ...result,
      props: {
        ...result.props,
        ...(await serverSideTranslations(locale, ['common', 'account'])),
      },
    };
  }
);
interface EmailProps {
  profile: Profile;
}
const Email: NextPage<EmailProps> = props => {
  const { t } = useTranslation('account');
  const router = useRouter();

  const methods = useForm({});

  const handleSubmit = async (data: Profile) => {
    try {
      await ProfileApis.put(data);
      await router.push({ pathname: '/account', query: { success: 'email' } });
    } catch (e) {
      console.error('Error:', JSON.stringify(e));
      alert(e);
    }
  };

  return (
    <PrivateLayout title={t('accountSettings')}>
      <Form methods={methods} onSubmit={handleSubmit}>
        <h3 className='mb-2'>{t('changeEmailAddress')}</h3>
        <Section>
          <Section.Title>{t('newEmailAddress')}</Section.Title>
          <Section.Content className='flex items-center justify-between'>
            <EmailField required name='email' className='w-[480px]' />
          </Section.Content>
        </Section>
        <div className='flex justify-center gap-5 h-[52px] mt-10'>
          <Button className='w-[480px]' type='submit'>
            {t('sendConfirmationEmail')}
          </Button>
        </div>
      </Form>
    </PrivateLayout>
  );
};

export default Email;
