import { useTranslation } from 'next-i18next';

import { Button } from '@/common/Button';
import { LinePreview } from './LinePreview';
import { MailPreview } from './MailPreview';
import { MarketingActionAlias } from '@/marketing-action/types';

export type MessageContentPreviewType = 'line' | 'mail';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {
  type?: MessageContentPreviewType;
  body?: string;
  headline?: string;
  onPreviewClick: () => void;
  color?: string;

  desktop?: boolean;
  showViewShoppingCartButton?: boolean;
  isOverlay?: boolean;
  marketingAction?: MarketingActionAlias;
  flexMessageImageRatio?: string;
};

// eslint-disable-next-line no-empty-pattern
export const MessageContentPreview = ({
  type = 'mail',
  onPreviewClick,
  color,
  flexMessageImageRatio,
  ...restProps
}: Props) => {
  const { t } = useTranslation('marketingAction');

  return (
    <div>
      <div className='flex items-center justify-between mb-1'>
        <span className='text-secondary'>{t('previewMobile')}</span>
        <Button variant='link' colorScheme='negative' onClick={onPreviewClick}>
          {t('openPreview')}
        </Button>
      </div>
      {type === 'mail' ? (
        <MailPreview showViewShoppingCartButton={false} color={color} {...restProps} />
      ) : (
        <LinePreview imageRatio={flexMessageImageRatio} {...restProps} />
      )}
    </div>
  );
};
