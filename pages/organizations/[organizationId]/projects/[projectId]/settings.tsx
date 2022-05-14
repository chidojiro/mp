import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Layout } from '@/components/Layout';
import { ProjectSettings } from '@/project';

export const getServerSideProps = async ({ locale = 'ja' }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'settings'])),
  },
});

const SettingsPage = () => {
  const { t } = useTranslation('settings');

  return (
    <Layout title={t('menuSettings')}>
      <ProjectSettings />
    </Layout>
  );
};

export default SettingsPage;
