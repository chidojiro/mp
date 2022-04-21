import React from 'react';

import { GetServerSideProps, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import { ProfileApis } from '@/apis/profile';
import { Form } from '@/components/common/Form';
import { Layout } from '@/components/Layout';
import { Section } from '@/components/Section';
import { Button } from '@/components/common/Button';
import { useProfile } from '@/hooks';
import { SSR } from '@/ssr';
import { Profile } from '@/types';
import { EmailField } from '@/components/EmailField';

export const getServerSideProps: GetServerSideProps = SSR.withProps('profile')(
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
  const { data: profile } = useProfile(props.profile);

  const methods = useForm({
    defaultValues: profile,
  });
  const { reset } = methods;

  React.useEffect(() => {
    reset(profile);
  }, [profile, reset]);

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
    <Layout title={t('accountSettings')}>
      <Form methods={methods} onSubmit={handleSubmit}>
        <h3 className='mb-2'>{t('changeEmailAddress')}</h3>
        <Section>
          <Section.Title>{t('emailAddressLoginId')}</Section.Title>
          <Section.Content className='flex items-center justify-between'>
            <EmailField name='email' className='w-[480px]' />
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

export default Email;
