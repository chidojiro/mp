import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SideMenu, SideMenuGroup } from '../../common/SideMenu';
import { ActionContainer } from '../ActionContainer';
import { CartAbandonedOverview } from './CartAbandonedOverview';
import { DeliveryAfterPurchaseOverview } from './DeliveryAfterPurchaseOverview';
import { UpdateInformation } from './UpdateInformation';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

// eslint-disable-next-line no-empty-pattern
export const NewMarketingAction = ({}: Props) => {
  const { query, pathname } = useRouter();
  const { t } = useTranslation('marketingAction');

  const {
    query: { marketingActionName },
    push,
  } = useRouter();

  const handleMAChange = (marketingActionName: string) => {
    push({
      pathname,
      query: { ...query, marketingActionName },
    });
  };

  const groups: SideMenuGroup[] = [
    {
      icon: 'mail',
      label: t('messageDelivery'),
      items: [
        {
          content: <CartAbandonedOverview />,
          label: t('cartAbandoned'),
          onClick: () => handleMAChange('cart-abandoned'),
          value: 'cart-abandoned',
        },
        {
          content: <DeliveryAfterPurchaseOverview />,
          label: t('stepDeliveryAfterPurchase'),
          onClick: () => handleMAChange('step-delivery-after-purchase'),
          value: 'step-delivery-after-purchase',
        },
      ],
    },
    {
      icon: 'chatbot2',
      label: t('chatbot'),
      items: [
        {
          content: (
            <ActionContainer
              iconName='cart-question'
              title={t('cartPageFaq')}
              description={t('cartPageFaqDescription')}
              descriptionImageUrl='/images/cart-page-faq-description.png'
            ></ActionContainer>
          ),
          label: t('cartPageFaq'),
          onClick: () => handleMAChange('cart-page-faq'),
          value: 'cart-page-faq',
        },
        {
          content: (
            <ActionContainer
              iconName='chatbot'
              title={t('recommendationDiagnosisBotStatic')}
              description={t('recommendationDiagnosisBotStaticDescription')}
              descriptionImageUrl='/images/recommendation-diagnosis-bot-description.png'
            ></ActionContainer>
          ),
          onClick: () => handleMAChange('recommendation-diagnosis-bot'),
          label: t('recommendationDiagnosisBotStatic'),
          value: 'recommendation-diagnosis-bot',
        },
        {
          content: (
            <ActionContainer
              iconName='ranking'
              title={t('rankingBasedOnOverallPurchaseHistory')}
              description={t('rankingBasedOnOverallPurchaseHistoryDescription')}
              descriptionImageUrl='/images/ranking-description.png'
            ></ActionContainer>
          ),
          onClick: () => handleMAChange('ranking-based-on-overall-purchase-history'),
          label: t('rankingBasedOnOverallPurchaseHistory'),
          value: 'ranking-based-on-overall-purchase-history',
        },
        {
          content: (
            <ActionContainer
              iconName='ranking'
              title={t('rankingByCategoryBasedOnOverallPurchaseHistory')}
              description={t('rankingByCategoryBasedOnOverallPurchaseHistoryDescription')}
              descriptionImageUrl='/images/ranking-description.png'
            ></ActionContainer>
          ),
          onClick: () => handleMAChange('ranking-by-category'),
          label: t('rankingByCategoryBasedOnOverallPurchaseHistory'),
          value: 'ranking-by-category',
        },
      ],
    },
    {
      icon: 'popup',
      label: t('popup'),
      items: [
        {
          content: (
            <ActionContainer
              iconName='free-shipping'
              title={t('conditionalFreeShipping')}
              description={t('conditionalFreeShippingDescription')}
              descriptionImageUrl='/images/conditional-free-shipping-description.png'
            ></ActionContainer>
          ),
          onClick: () => handleMAChange('conditional-free-shipping'),
          label: t('conditionalFreeShipping'),
          value: 'conditional-free-shipping',
        },
      ],
    },
  ];

  return (
    <div>
      <UpdateInformation />
      <SideMenu value={marketingActionName as string} groups={groups} />
    </div>
  );
};
