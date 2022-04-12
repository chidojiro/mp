import { useTranslation } from 'next-i18next';

import { Button } from '@/components/common';
import { FileUploader } from '@/components/FileUploader';

export const Step1Settings = () => {
  const { t } = useTranslation('marketingAction');

  return (
    <>
      <div className='px-10 -mx-10 border-b-4 border-white pb-7'>
        <div className='text-medium'>{t('faqContentSettingsDescription')}</div>
      </div>

      <div className='px-10 -mx-10 border-b-4 border-white pb-7 mt-[40px]'>
        <div className='mb-2 font-semibold'>{t('downloadTemplate')}</div>
        <div className='mb-4 text-medium'>{t('faqTemplateDownloadDescription')}</div>
        <div className='flex items-center justify-center'>
          <Button colorScheme='negative' className='text-medium w-[240px]'>
            {t('download')}
          </Button>
        </div>
      </div>

      <div className='px-10 -mx-10 border-white pb-7 mt-[40px]'>
        <div className='text-medium'>
          <div className='mb-2.5 font-bold text-gray-dark'>{t('csvFileUpload')}</div>
          <div className='mb-4 text-medium'>{t('faqCSVUploadDescription')}</div>
          <FileUploader />
        </div>
      </div>
    </>
  );
};
