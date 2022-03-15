import { Layout } from '@/components';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { CartAbandoned } from './CartAbandoned';
import { FreeShipping } from './FreeShipping';

export const Edit = () => {
  const { t } = useTranslation();
  const { query } = useRouter();

  const renderMAEditor = () => {
    switch (query.marketing_action_name) {
      case 'cart-abandoned':
        return <CartAbandoned />;
      case 'conditional-free-shipping':
        return <FreeShipping />;
      default:
        return null;
    }
  };

  return <Layout title={t('editor')}>{renderMAEditor()}</Layout>;
};
