import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { MyMarketingAction } from '@/components';

function MyMarketingActionPage() {
  return <MyMarketingAction />;
}

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'marketingAction', 'report'])),
  },
});

export default MyMarketingActionPage;
