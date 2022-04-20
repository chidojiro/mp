import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { ReportDetails } from '@/components/report';

export const getServerSideProps = async ({ locale = 'ja' }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'report'])),
  },
});

const Report = () => {
  return <ReportDetails />;
};

export default Report;
