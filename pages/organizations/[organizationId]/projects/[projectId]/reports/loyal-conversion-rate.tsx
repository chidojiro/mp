import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Layout } from '@/components/Layout';

export const getStaticProps = async ({ locale = 'ja' }) => ({
  props: {
    ...(await serverSideTranslations(locale)),
  },
});

function LoyalConversionRate() {
  const { t } = useTranslation();

  return <Layout title={t('loyalConversionRate')}></Layout>;
}

export default LoyalConversionRate;
