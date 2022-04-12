import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { ReportList } from '@/components';

const Reports = () => {
  return <ReportList />;
};

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'report'])),
  },
});

export default Reports;
