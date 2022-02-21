import { ReportList } from '@/components';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Reports = () => {
  return <ReportList />;
};

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'report'])),
  },
});

export default Reports;
