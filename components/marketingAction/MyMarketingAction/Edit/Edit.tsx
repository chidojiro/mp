import { Layout } from '@/components';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { CartAbandoned } from './CartAbandoned';
import { DeliveryAfterPurchase } from './DeliveryAfterPurchase';

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
      default:
        return null;
    }
  };

  const subTitleKeys: Record<string, string> = {
    'step-delivery-after-purchase': 'stepDeliveryAfterPurchase',
    'cart-abandoned': 'cartAbandoned',
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
