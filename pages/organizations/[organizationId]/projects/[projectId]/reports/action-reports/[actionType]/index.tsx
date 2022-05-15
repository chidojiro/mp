import { ReportList } from '@/report/ReportList';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const getServerSideProps = async ({ locale = 'ja' }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'report'])),
  },
});

const Reports = () => {
  return <ReportList />;
};

export default Reports;
