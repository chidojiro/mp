import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { PrivateLayout } from '@/layout/PrivateLayout';
import { ProjectSettings } from '@/project/ProjectSettings';

export const getServerSideProps = async ({ locale = 'ja' }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'settings'])),
  },
});

const SettingsPage = () => {
  const { t } = useTranslation('settings');

  return (
    <PrivateLayout title={t('menuSettings')}>
      <ProjectSettings />
    </PrivateLayout>
  );
};

export default SettingsPage;
