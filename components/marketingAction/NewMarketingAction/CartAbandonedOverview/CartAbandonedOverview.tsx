import { useTranslation } from 'next-i18next';

import { ActionContainer } from '../../ActionContainer';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

// eslint-disable-next-line no-empty-pattern
export const CartAbandonedOverview = ({}: Props) => {
  const { t } = useTranslation('marketingAction');

  return (
    <ActionContainer
      iconName='cart'
      title={t('cartAbandoned')}
      description={t('cartAbandonedDescription')}
      descriptionImageUrl='/images/cart-abandoned-description.png'
      flowImgUrl='/images/cart-abandoned-flow.png'
    ></ActionContainer>
  );
};
