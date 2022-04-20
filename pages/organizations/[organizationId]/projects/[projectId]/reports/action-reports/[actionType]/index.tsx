import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { ReportList } from '@/components/report';

export const getServerSideProps = async ({ locale = 'ja' }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'report'])),
  },
});

const Reports = () => {
  return <ReportList />;
};

export default Reports;
