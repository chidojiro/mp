import { Form } from '@/components/common';
import { useTranslation } from 'next-i18next';
import { VariableSign } from '../../VariableSign';
import { Message } from '../Message';

export const Step2Settings = () => {
  const { t } = useTranslation('marketingAction');

  return (
    <div className='flex justify-between'>
      <div>
        <div className='mb-1 font-bold text-gray-dark'>{t('carouselDisplay')}</div>
        <div className='font-bold text-medium text-secondary'>{t('title')}</div>
        <Form.Mentions
          name='step2.carousel_title'
          className='flex flex-row-reverse items-center mt-2 mb-4'
          singleLine
          label={<VariableSign />}
          rules={{ required: true }}
        />
        <div className='font-bold text-medium text-secondary'>{t('note')}</div>
        <Form.Mentions
          name='step2.carousel_note'
          className='flex flex-row-reverse items-center mt-2'
          singleLine
          label={<VariableSign />}
          rules={{ required: true }}
        />
      </div>
      <div className='p-10 w-[350px] bg-white rounded'>
        <Message />
      </div>
    </div>
  );
};
