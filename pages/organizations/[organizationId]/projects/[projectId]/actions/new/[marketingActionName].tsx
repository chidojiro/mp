import { useTranslation } from 'next-i18next';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Layout } from '@/components/Layout';
import { NewMarketingAction } from '@/components/marketingAction';

function MarketingActions() {
  const { t } = useTranslation('marketingAction');

  return (
    <Layout title={t('listOfPolicyTemplates')}>
      <NewMarketingAction />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale = 'ja' }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'marketingAction'])),
  },
});
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true, // false or 'blocking'
  };
}
export default MarketingActions;
