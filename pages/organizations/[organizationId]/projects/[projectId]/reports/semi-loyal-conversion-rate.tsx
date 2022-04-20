import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Layout } from '@/components/Layout';

export const getServerSideProps = async ({ locale = 'ja' }) => ({
  props: {
    ...(await serverSideTranslations(locale)),
  },
});

function SemiLoyalConversionRate() {
  const { t } = useTranslation();

  return <Layout title={t('semiLoyalConversionRate')}></Layout>;
}

export default SemiLoyalConversionRate;
