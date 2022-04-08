import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { MyMarketingAction } from '@/components';

function MarketingActionEditPage() {
  return <MyMarketingAction />;
}

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale)),
  },
});

export default MarketingActionEditPage;
