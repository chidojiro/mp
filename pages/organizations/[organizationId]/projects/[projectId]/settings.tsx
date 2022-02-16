import { Layout } from '@/components';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Settings = () => {
  const { t } = useTranslation();

  return <Layout title={t('menuSettings')}></Layout>;
};

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
});

export default Settings;
