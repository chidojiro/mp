import { Layout, MyMarketingAction } from '@/components';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

function MyMarketingActionPage() {
  const { t } = useTranslation();
  return (
    <Layout title={t('menuMyMarketingAction')}>
      <MyMarketingAction />
    </Layout>
  );
}

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'myMarketingAction'])),
  },
});

export default MyMarketingActionPage;
