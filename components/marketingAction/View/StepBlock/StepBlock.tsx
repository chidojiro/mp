import { useTranslation } from 'next-i18next';

import { Button } from '@/components/common';

type Props = {
  stepName: string;
  children: React.ReactNode;
  showPreview?: boolean;
  handlePreview?: () => void;
};

export const StepBlock = ({ stepName, children, showPreview = false, handlePreview }: Props) => {
  const { t } = useTranslation('marketingAction');

  return (
    <div className='p-10 pb-6 border-b-4 border-white'>
      <h5 className='text-gray-dark'>{stepName}</h5>
      {children}
      {showPreview && (
        <div className='text-center'>
          <Button
            colorScheme='negative'
            className='text-medium w-[240px]'
            onClick={() => handlePreview?.()}
          >
            {t('viewPreview')}
          </Button>
        </div>
      )}
    </div>
  );
};
