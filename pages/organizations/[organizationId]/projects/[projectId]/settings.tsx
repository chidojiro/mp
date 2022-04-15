import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Settings } from '@/components/settings';
import { Layout } from '@/components/Layout';

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'settings'])),
  },
});

const SettingsPage = () => {
  const { t } = useTranslation('settings');

  return (
    <Layout title={t('menuSettings')}>
      <Settings />
    </Layout>
  );
};

export default SettingsPage;
