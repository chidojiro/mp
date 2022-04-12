import { useTranslation } from 'next-i18next';

import { Answer, StepBlock } from '../StepBlock';
import { AppearanceCond } from '../StepBlock/AppearanceCond';

type Props = {
  settings: any;
};

export const ConditionalFreeShipping = ({ settings }: Props) => {
  const { t } = useTranslation('marketingAction');
  const freeShippingAmount = `${settings.free_shipping_amount}${t('freeShippingPriceEndLabel')}`;
  return (
    <StepBlock stepName={t('popupSettings')}>
      <Answer name={t('templateSelection')}>{settings.template_selection}</Answer>
      <Answer name={t('freeShippingAmountLabel')}>{freeShippingAmount}</Answer>
      <AppearanceCond settings={settings} />
    </StepBlock>
  );
};
