import { Layout } from '@/components';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

function F2ConversionRateTrends() {
  const { t } = useTranslation();

  return <Layout title={t('f2ConversionRateTrends')}></Layout>;
}

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale)),
  },
});

export default F2ConversionRateTrends;
