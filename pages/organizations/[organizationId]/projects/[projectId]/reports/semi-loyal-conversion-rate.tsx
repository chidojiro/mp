import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { PrivateLayout } from '@/layout/PrivateLayout';

export const getServerSideProps = async ({ locale = 'ja' }) => ({
  props: {
    ...(await serverSideTranslations(locale)),
  },
});

function SemiLoyalConversionRate() {
  const { t } = useTranslation();

  return <PrivateLayout title={t('semiLoyalConversionRate')}></PrivateLayout>;
}

export default SemiLoyalConversionRate;
