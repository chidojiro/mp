import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SideMenu, SideMenuGroup } from '../../common/SideMenu';
import { ActionContainer } from '../ActionContainer';
import { UpdateInformation } from './UpdateInformation';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

// eslint-disable-next-line no-empty-pattern
export const NewMarketingAction = ({}: Props) => {
  const { query, pathname } = useRouter();
  const { t } = useTranslation('marketingAction');

  const {
    query: { marketingActionName },
  } = useRouter();

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
          label: (
            <Link href={{ pathname, query: { ...query, marketingActionName: 'cart-abandoned' } }}>
              {t('cartAbandoned')}
            </Link>
          ),
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
          label: (
            <Link
              href={{
                pathname,
                query: { ...query, marketingActionName: 'step-delivery-after-purchase' },
              }}
            >
              {t('stepDeliveryAfterPurchase')}
            </Link>
          ),
          value: 'step-delivery-after-purchase',
        },
      ],
    },
    {
      icon: 'mail',
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
          label: (
            <Link href={{ pathname, query: { ...query, marketingActionName: 'cart-page-faq' } }}>
              {t('cartPageFaq')}
            </Link>
          ),
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
          label: (
            <Link
              href={{
                pathname,
                query: { ...query, marketingActionName: 'recommendation-diagnosis-bot' },
              }}
            >
              {t('recommendationDiagnosisBotStatic')}
            </Link>
          ),
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
          label: (
            <Link
              href={{
                pathname,
                query: {
                  ...query,
                  marketingActionName: 'ranking-based-on-overall-purchase-history',
                },
              }}
            >
              {t('rankingBasedOnOverallPurchaseHistory')}
            </Link>
          ),
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
          label: (
            <Link
              href={{
                pathname,
                query: {
                  ...query,
                  marketingActionName: 'ranking-by-category-based-on-overall-purchase-history',
                },
              }}
            >
              {t('rankingByCategoryBasedOnOverallPurchaseHistory')}
            </Link>
          ),
          value: 'ranking-by-category-based-on-overall-purchase-history',
        },
      ],
    },
    {
      icon: 'mail',
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
          label: (
            <Link
              href={{
                pathname,
                query: { ...query, marketingActionName: 'conditional-free-shipping' },
              }}
            >
              {t('conditionalFreeShipping')}
            </Link>
          ),
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
