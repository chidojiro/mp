import React from 'react';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';

import { Button } from '@/common/Button';
import { Icon } from '@/common/Icon';
import { ConfirmButton } from '../ConfirmButton';
import { useVisibilityControl } from '@/common/useVisibilityControl';

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
      <div>
        {!!useTooltip && (
          <ConfirmButton
            tooltipContent={t('alertConfirm')}
            className='w-[240px]'
            onClick={onConfirmClick}
            type={onConfirmClick ? 'button' : 'submit'}
            colorScheme='green'
            variant={complete ? 'solid' : 'outline'}
          >
            <div
              className={classNames(
                'flex items-center justify-center w-5 h-5 mr-2 rounded-full',
                complete ? 'bg-white' : 'bg-gray'
              )}
            >
              <Icon
                name='check'
                size={10}
                className={classNames(complete ? 'text-mint-green' : 'text-white')}
              />
            </div>
            {t('confirm')}
          </ConfirmButton>
        )}
      </div>
    </div>
  );
};
