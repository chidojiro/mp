import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Layout } from '@/components/Layout';

function ReturnOfF1DormantCustomers() {
  const { t } = useTranslation();

  return <Layout title={t('returnOfF1DormantCustomers')}></Layout>;
}

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale)),
  },
});

export default ReturnOfF1DormantCustomers;
