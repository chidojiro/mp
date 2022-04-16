import { useTranslation } from 'next-i18next';

import { Button } from '@/components/common';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = { onPreviewClick?: () => void; onConfirmClick?: () => void; complete?: boolean };

// eslint-disable-next-line no-empty-pattern
export const StepActions = ({ onPreviewClick, onConfirmClick, complete }: Props) => {
  const { t } = useTranslation('marketingAction');

  return (
    <div className='flex items-center justify-center gap-2 mt-5'>
      {!!onPreviewClick && (
        <Button colorScheme='negative' className='w-[240px]' onClick={onPreviewClick}>
          {t('viewPreview')}
        </Button>
      )}
      <Button
        onClick={onConfirmClick}
        type={onConfirmClick ? 'button' : 'submit'}
        colorScheme='green'
        variant={complete ? 'outline' : 'solid'}
        className='w-[240px]'
      >
        {t('confirm')}
      </Button>
    </div>
  );
};
