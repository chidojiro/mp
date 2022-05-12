import React from 'react';
import { useTranslation } from 'next-i18next';

import { Button } from '@/components/common';
import { useVisibilityControl } from '@/hooks';

import { ConfirmButtonTooltip } from '../ConfirmButtonTooltip';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {
  onPreviewClick?: () => void;
  onConfirmClick?: () => void;
  complete?: boolean;
  useTooltip?: boolean;
};

// eslint-disable-next-line no-empty-pattern
export const StepActions = ({ onPreviewClick, onConfirmClick, complete, useTooltip }: Props) => {
  const { t } = useTranslation('marketingAction');
  const tooltipControl = useVisibilityControl({ defaultVisible: useTooltip });

  React.useEffect(() => {
    if (complete) {
      tooltipControl.close();
    }
  }, [complete, tooltipControl]);

  return (
    <div className='flex items-center justify-center gap-2 mt-5'>
      {!!onPreviewClick && (
        <Button colorScheme='negative' className='w-[240px]' onClick={onPreviewClick}>
          {t('viewPreview')}
        </Button>
      )}
      <div className='w-[240px]'>
        {!!useTooltip && (
          <ConfirmButtonTooltip control={tooltipControl}>{t('alertConfirm')}</ConfirmButtonTooltip>
        )}
        <Button
          onClick={onConfirmClick}
          type={onConfirmClick ? 'button' : 'submit'}
          colorScheme='green'
          variant={complete ? 'outline' : 'solid'}
          className='w-full'
        >
          {t('confirm')}
        </Button>
      </div>
    </div>
  );
};
