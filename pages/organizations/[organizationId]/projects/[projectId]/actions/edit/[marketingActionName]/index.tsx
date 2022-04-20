import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { Edit } from '@/components/marketingAction/Edit';

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale)),
  },
});

function MarketingActionEditPage() {
  return <Edit />;
}

export default MarketingActionEditPage;
