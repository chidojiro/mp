import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import { SideMenu, SideMenuGroup } from '@/components/common/SideMenu';
import { ActionContainer } from '@/components/ActionContainer';

export const ListTemplatePage = () => {
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
          content: (
            <ActionContainer
              iconName='cart'
              title={t('cartAbandoned')}
              description={t('cartAbandonedDescription')}
              descriptionImageUrl='/images/cart-abandoned-description.png'
              flowImgUrl='/images/cart-abandoned-flow.png'
            ></ActionContainer>
          ),
          label: t('cartAbandoned'),
          onClick: () => handleMAChange('cart-abandoned'),
          value: 'cart-abandoned',
        },
        {
          content: (
            <ActionContainer
              iconName='mails'
              title={t('stepDeliveryAfterPurchase')}
              description={t('stepDeliveryAfterPurchaseDescription')}
              descriptionImageUrl='/images/step-delivery-after-purchase-description.png'
              flowImgUrl='/images/step-delivery-after-purchase-flow.png'
            ></ActionContainer>
          ),
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
              descriptionImageUrl='/images/ranking-purchase.png'
            ></ActionContainer>
          ),
          onClick: () => handleMAChange('ranking-based-on-overall-purchase-history'),
          label: t('rankingBasedOnOverallPurchaseHistory'),
          value: 'ranking-based-on-overall-purchase-history',
        },
        {
          content: (
            <ActionContainer
              iconName='ranking-by-category'
              title={t('rankingByCategoryBasedOnOverallPurchaseHistory')}
              description={t('rankingByCategoryBasedOnOverallPurchaseHistoryDescription')}
              descriptionImageUrl='/images/ranking-category.png'
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

  return <SideMenu value={marketingActionName as string} groups={groups} />;
};
