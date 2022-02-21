import { SideMenu, SideMenuItem } from '../../common/SideMenu';
import { useTranslation } from 'next-i18next';
import { UpdateInformation } from './UpdateInformation';
import { ActionContainer } from '../ActionContainer';
import { CartAbandoned } from './CartAbandoned';
import { useRouter } from 'next/router';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

// eslint-disable-next-line no-empty-pattern
export const NewMarketingAction = ({}: Props) => {
  const { t } = useTranslation('marketingAction');

  const {
    query: { marketingActionName },
  } = useRouter();

  const menuItems: SideMenuItem[] = [
    {
      content: (
        <ActionContainer
          iconName='cart'
          title={t('cartAbandoned')}
          description={t('cartAbandonedDescription')}
          descriptionImageUrl=''
          flowImgUrl='/images/cart-abandoned-flow.png'></ActionContainer>
      ),
      label: t('cartAbandoned'),
      value: 'cart-abandoned',
    },
    {
      content: (
        <ActionContainer
          iconName='mails'
          title={t('stepDeliveryAfterPurchase')}
          description={t('stepDeliveryAfterPurchaseDescription')}
          descriptionImageUrl='/image/'
          flowImgUrl='/images/step-delivery-after-purchase-flow.png'></ActionContainer>
      ),
      label: t('stepDeliveryAfterPurchase'),
      value: 'step-delivery-after-purchase',
    },
    {
      content: (
        <ActionContainer
          iconName='cart-question'
          title={t('cartPageFaq')}
          description={t('cartPageFaqDescription')}
          descriptionImageUrl='/image/'
          flowImgUrl=''></ActionContainer>
      ),
      label: t('cartPageFaq'),
      value: 'cart-page-faq',
    },
    {
      content: (
        <ActionContainer
          iconName='chatbot'
          title={t('recommendationDiagnosisBotStatic')}
          description={t('recommendationDiagnosisBotStaticDescription')}
          descriptionImageUrl='/image/'
          flowImgUrl=''></ActionContainer>
      ),
      label: t('recommendationDiagnosisBotStatic'),
      value: 'recommendation-diagnosis-bot',
    },
    {
      content: (
        <ActionContainer
          iconName='free-shipping'
          title={t('conditionalFreeShipping')}
          description={t('conditionalFreeShippingDescription')}
          descriptionImageUrl='/image/'
          flowImgUrl=''></ActionContainer>
      ),
      label: t('conditionalFreeShipping'),
      value: 'conditional-free-shipping',
    },
    // {
    //   content: (
    //     <ActionContainer
    //       iconName='cart'
    //       title={t('cartAbandoned')}
    //       description={t('cartAbandonedDescription')}
    //       descriptionImageUrl='/image/'
    //       flowImgUrl=''></ActionContainer>
    //   ),
    //   label: t(''),
    //   value: '',
    // },
    // {
    //   content: (
    //     <ActionContainer
    //       iconName='cart'
    //       title={t('cartAbandoned')}
    //       description={t('cartAbandonedDescription')}
    //       descriptionImageUrl='/image/'
    //       flowImgUrl=''></ActionContainer>
    //   ),
    //   label: t(''),
    //   value: '',
    // },
  ];

  return (
    <div>
      <UpdateInformation />
      <SideMenu value={marketingActionName as string} items={menuItems} />
    </div>
  );
};
