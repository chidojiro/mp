import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Edit } from '@/components/marketingAction/Edit';

function MarketingActionEditPage() {
  return <Edit />;
}

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale)),
  },
});

export default MarketingActionEditPage;
