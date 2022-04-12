import { useTranslation } from 'next-i18next';

import { ActionContainer } from '../../ActionContainer';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = { showUseTemplateBtn?: boolean };

// eslint-disable-next-line no-empty-pattern
export const DeliveryAfterPurchaseOverview = ({ showUseTemplateBtn }: Props) => {
  const { t } = useTranslation('marketingAction');

  return (
    <ActionContainer
      showUseTemplateBtn={showUseTemplateBtn}
      iconName='mails'
      title={t('stepDeliveryAfterPurchase')}
      description={t('stepDeliveryAfterPurchaseDescription')}
      descriptionImageUrl='/images/step-delivery-after-purchase-description.png'
      flowImgUrl='/images/step-delivery-after-purchase-flow.png'
    ></ActionContainer>
  );
};
