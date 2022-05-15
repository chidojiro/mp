import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { PrivateLayout } from '@/layout/PrivateLayout';

import { CartFAQ } from './CartFAQ/CartFAQ';
import { CartAbandoned } from './CartAbandoned';
import { DeliveryAfterPurchase } from './DeliveryAfterPurchase';
import { FreeShipping } from './FreeShipping';
import { RankingByCategory } from './RankingByCategory';
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
      case 'ranking-based-on-overall-purchase-history':
      case 'ranking-by-category':
        return <RankingByCategory />;
      case 'conditional-free-shipping':
        return <FreeShipping />;
      case 'recommendation-diagnosis-bot':
        return <RecommendedBot />;
      case 'cart-page-faq':
        return <CartFAQ />;
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
    <PrivateLayout
      title={tCommon('editor')}
      subTitle={t(subTitleKeys[query.marketingActionName as string])}
    >
      {renderMAEditor()}
    </PrivateLayout>
  );
};
