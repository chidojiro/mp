import { useTranslation } from 'next-i18next';

import { Button } from '@/components/common';
import { FileUploader } from '@/components/FileUploader';

export const Step1Settings = () => {
  const { t } = useTranslation('marketingAction');
  const aggregationPeriodOptions = [
    { value: '1Month', label: t('1Month') },
    { value: '1Week', label: t('1Week') },
  ];

  return (
    <div className='text-gray-700 '>
      <div className='px-10 pb-5 mb-5 -mx-10 border-b-4 border-white text-medium'>
        {t('descriptionPlaceholder')}
      </div>
      <div className='px-10 pb-5 mb-5 -mx-10 border-b-4 border-white'>
        <div className='mb-2.5 font-bold text-gray-dark'>{t('downloadTemplate')}</div>
        <div className='mb-4 text-medium'>{t('downloadTemplateDesc')}</div>
        <div className='w-full text-center'>
          <Button colorScheme='negative' className='text-medium w-[240px]'>
            {t('download')}
          </Button>
        </div>
      </div>
      <div className='text-medium'>
        <div className='mb-2.5 font-bold text-gray-dark'>{t('downloadTemplate')}</div>
        <div className='mb-4 text-medium'>{t('downloadTemplateDesc')}</div>
        <FileUploader />
      </div>
    </div>
  );
};
