import { Button, Form, Layout, Section } from '@/components';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

// eslint-disable-next-line no-empty-pattern
const Email = ({}: Props) => {
  const { t } = useTranslation('account');
  const router = useRouter();

  const methods = useForm({
    defaultValues: {
      email: 'sample@gmail.com',
    },
  });

  return (
    <Layout title={t('accountSettings')}>
      <Form
        methods={methods}
        onSubmit={() => {
          router.push({ pathname: '/account', query: { success: 'email' } });
        }}
      >
        <h3 className='mb-2'>{t('changeEmailAddress')}</h3>
        <Section>
          <Section.Title>{t('emailAddressLoginId')}</Section.Title>
          <Section.Content className='flex items-center justify-between'>
            <Form.Input name='email' className='w-[480px]' />
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

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'account'])),
  },
});
