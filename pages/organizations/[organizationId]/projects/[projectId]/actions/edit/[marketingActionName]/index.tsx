import { MyMarketingAction } from '@/components';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

function MarketingActionEditPage() {
  return <MyMarketingAction />;
}

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale)),
  },
});

export default MarketingActionEditPage;
