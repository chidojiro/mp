import { useTranslation } from 'next-i18next';
import { Controller, useFormContext } from 'react-hook-form';

import { Button } from '@/components/common';
import { FileUploader } from '@/components/FileUploader';
import { useAsset } from '@/hooks/api';

type Props = {
  sourceId: string;
};

export const Step1Settings = ({ sourceId }: Props) => {
  const { t } = useTranslation('marketingAction');
  const {
    formState: { errors },
    control,
  } = useFormContext();

  const { data: source } = useAsset(sourceId);

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
        <div className='mb-2.5 font-bold text-gray-dark'>{t('updateCSV')}</div>
        <div className='mb-4 text-medium'>{t('faqCSVUploadDescription')}</div>
        <Controller
          control={control}
          name='recommend_source'
          rules={{ required: true }}
          render={({ field: { onChange, ref } }) => (
            <FileUploader
              onChange={onChange}
              isError={!!errors['recommend_source']}
              name={source?.name}
            />
          )}
        />
      </div>
    </div>
  );
};
