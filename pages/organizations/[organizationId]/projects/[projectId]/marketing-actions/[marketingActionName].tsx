import { MyMarketingAction } from '@/components';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

function MyMarketingActionPage() {
  return <MyMarketingAction />;
}

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'myMarketingAction'])),
  },
});

export default MyMarketingActionPage;