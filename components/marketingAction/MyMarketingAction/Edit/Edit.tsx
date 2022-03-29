import { Layout } from '@/components';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { CartAbandoned } from './CartAbandoned';
import { DeliveryAfterPurchase } from './DeliveryAfterPurchase';
import { RankingByCategory } from './RankingByCategory';
import { FreeShipping } from './FreeShipping';
import { RecommendedBot } from './RecommendedBot';

export const Edit = () => {
  const { t } = useTranslation('marketingAction');
  const { t: tCommon } = useTranslation();
  const { query } = useRouter();

  const renderMAEditor = () => {
    switch (query.marketingActionName) {
      case 'cart-abandoned':
        return <CartAbandoned />;
      case 'step-delivery-after-purchase':
        return <DeliveryAfterPurchase />;
      case 'ranking-by-category':
        return <RankingByCategory />;
      case 'conditional-free-shipping':
        return <FreeShipping />;
      case 'recommendation-diagnosis-bot':
        return <RecommendedBot />;
      default:
        return null;
    }
  };

  const subTitleKeys: Record<string, string> = {
    'step-delivery-after-purchase': 'stepDeliveryAfterPurchase',
    'cart-abandoned': 'cartAbandoned',
    'ranking-by-category': 'rankingBasedOnOverallPurchaseHistory',
    'recommendation-diagnosis-bot': 'recommendationDiagnosisBotStatic',
  };

  return (
    <Layout
      title={tCommon('editor')}
      subTitle={t(subTitleKeys[query.marketingActionName as string])}
    >
      {renderMAEditor()}
    </Layout>
  );
};
