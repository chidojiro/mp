import { Layout } from '@/components';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { CartAbandoned } from './CartAbandoned';

export const Edit = () => {
  const { t } = useTranslation();
  const { query } = useRouter();

  const renderMAEditor = () => {
    switch (query.marketing_action_name) {
      case 'cart-abandoned':
        return <CartAbandoned />;
      default:
        return null;
    }
  };

  return <Layout title={t('editor')}>{renderMAEditor()}</Layout>;
};
