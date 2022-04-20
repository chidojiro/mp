import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Layout } from '@/components/Layout';

export const getServerSideProps = async ({ locale = 'ja' }) => ({
  props: {
    ...(await serverSideTranslations(locale)),
  },
});

function ReturnOfF1DormantCustomers() {
  const { t } = useTranslation();

  return <Layout title={t('returnOfF1DormantCustomers')}></Layout>;
}

export default ReturnOfF1DormantCustomers;
