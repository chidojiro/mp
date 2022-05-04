import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { ActionContainer } from '@/components/ActionContainer';
import { SideMenu, SideMenuGroup } from '@/components/common/SideMenu';
import { Layout } from '@/components/Layout';
import { MarketingActionAlias, TARGET } from '@/types';

export const getServerSideProps = async ({ locale = 'ja' }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'marketingAction'])),
  },
});

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
              key='cartAbandoned'
              alias={MarketingActionAlias.CART_LEFT_NOTIFICATION}
              iconName='cart'
              title={t('cartAbandoned')}
              description={t('cartAbandonedDescription')}
              descriptionImageUrl='/images/cart-abandoned-description.png'
              flowImgUrl='/images/cart-abandoned-flow.png'
              output={t('messageDelivery')}
            ></ActionContainer>
          ),
          label: t('cartAbandoned'),
          onClick: () => handleMAChange('cart-abandoned'),
          value: 'cart-abandoned',
        },
        {
          content: (
            <ActionContainer
              key='stepDeliveryAfterPurchase'
              iconName='mails'
              alias={MarketingActionAlias.AFTER_PURCHASE}
              title={t('stepDeliveryAfterPurchase')}
              description={t('stepDeliveryAfterPurchaseDescription')}
              descriptionImageUrl='/images/step-delivery-after-purchase-description.png'
              flowImgUrl='/images/step-delivery-after-purchase-flow.png'
              targets={[TARGET.F1, TARGET.F2, TARGET.SEMI_LOYAL, TARGET.LOYAL_DORMANT]}
              output={t('messageDelivery')}
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
              key='cartPageFaqDescription'
              alias={MarketingActionAlias.CART_PAGE_FAQ}
              iconName='cart-question'
              title={t('cartPageFaq')}
              description={t('cartPageFaqDescription')}
              descriptionImageUrl='/images/cart-page-faq-description.png'
              targets={[
                TARGET.F0_MEMBER,
                TARGET.F0_OTHERS,
                TARGET.F1,
                TARGET.F2,
                TARGET.SEMI_LOYAL,
                TARGET.F1_DORMANT,
              ]}
              appearance={t('cart')}
            ></ActionContainer>
          ),
          label: t('cartPageFaq'),
          onClick: () => handleMAChange('cart-page-faq'),
          value: 'cart-page-faq',
        },
        {
          content: (
            <ActionContainer
              key='recommendationDiagnosisBotStatic'
              alias={MarketingActionAlias.RECOMMEND_DIAGNOSTIC}
              iconName='chatbot'
              title={t('recommendationDiagnosisBotStatic')}
              description={t('recommendationDiagnosisBotStaticDescription')}
              descriptionImageUrl='/images/recommendation-diagnosis-bot-description.png'
              targets={[TARGET.F0_MEMBER, TARGET.F0_OTHERS, TARGET.F1]}
              appearance={t('category')}
            ></ActionContainer>
          ),
          onClick: () => handleMAChange('recommendation-diagnosis-bot'),
          label: t('recommendationDiagnosisBotStatic'),
          value: 'recommendation-diagnosis-bot',
        },
        {
          content: (
            <ActionContainer
              key='rankingBasedOnOverallPurchaseHistory'
              alias={MarketingActionAlias.HISTORY_PURCHASE}
              iconName='ranking'
              title={t('rankingBasedOnOverallPurchaseHistory')}
              description={t('rankingBasedOnOverallPurchaseHistoryDescription')}
              descriptionImageUrl='/images/ranking-purchase.png'
              appearance='TOP'
            ></ActionContainer>
          ),
          onClick: () => handleMAChange('ranking-based-on-overall-purchase-history'),
          label: t('rankingBasedOnOverallPurchaseHistory'),
          value: 'ranking-based-on-overall-purchase-history',
        },
        {
          content: (
            <ActionContainer
              key='rankingByCategoryBasedOnOverallPurchaseHistory'
              alias={MarketingActionAlias.HISTORY_PURCHASE_CATEGORY}
              iconName='ranking-by-category'
              title={t('rankingByCategoryBasedOnOverallPurchaseHistory')}
              description={t('rankingByCategoryBasedOnOverallPurchaseHistoryDescription')}
              descriptionImageUrl='/images/ranking-category.png'
              appearance='TOP'
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
              key='conditionalFreeShipping'
              alias={MarketingActionAlias.CONDITIONAL_FREE_SHIPPING}
              iconName='free-shipping'
              title={t('conditionalFreeShipping')}
              description={t('conditionalFreeShippingDescription')}
              descriptionImageUrl='/images/conditional-free-shipping-description.png'
              output={t('popup')}
              appearance={t('cart')}
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

function MarketingActions() {
  const { t } = useTranslation('marketingAction');

  return (
    <Layout title={t('listOfPolicyTemplates')}>
      <ListTemplatePage />
    </Layout>
  );
}

export default MarketingActions;
