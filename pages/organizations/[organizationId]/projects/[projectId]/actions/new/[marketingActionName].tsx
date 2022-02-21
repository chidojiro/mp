import { Layout, NewMarketingAction } from '@/components';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

function MarketingActions() {
  const { t } = useTranslation('marketingAction');

  return (
    <Layout title={t('listOfPolicyTemplates')}>
      <NewMarketingAction />
    </Layout>
  );
}

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'marketingAction'])),
  },
});

export default MarketingActions;
