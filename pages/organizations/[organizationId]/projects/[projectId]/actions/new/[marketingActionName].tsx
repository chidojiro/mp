import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Layout } from '@/components/Layout';
import { ListTemplatePage } from '@/libs/templates';

function MarketingActions() {
  const { t } = useTranslation('marketingAction');

  return (
    <Layout title={t('listOfPolicyTemplates')}>
      <ListTemplatePage />
    </Layout>
  );
}

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'marketingAction'])),
  },
});

export default MarketingActions;
