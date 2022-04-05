import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Layout } from '@/components';

function SemiLoyalConversionRate() {
  const { t } = useTranslation();

  return <Layout title={t('semiLoyalConversionRate')}></Layout>;
}

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale)),
  },
});

export default SemiLoyalConversionRate;
