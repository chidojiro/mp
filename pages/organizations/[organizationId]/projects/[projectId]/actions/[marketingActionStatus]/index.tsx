import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { ListActionPage } from '@/libs/actions';

function MyMarketingActionPage() {
  return <ListActionPage />;
}
export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'marketingAction', 'report'])),
  },
});

export default MyMarketingActionPage;
