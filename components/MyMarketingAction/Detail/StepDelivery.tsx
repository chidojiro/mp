import { useTranslation } from 'next-i18next';

export const StepDelivery = () => {
  const { t } = useTranslation('myMarketingAction');

  return (
    <div className='rounded-bl-lg rounded-br-lg bg-gray-light'>
      <div className='p-10 pb-6 border-b-4 border-white'>
        <h5 className='text-secondary'>{t('useLine')}</h5>
        <div className='my-2 font-bold text-gray-dark'>{t('useLine')}</div>
        <div className='text-medium text-gray-dark'>{'value'}</div>
      </div>
      <div className='p-10 pt-7'>
        <h5 className='text-secondary'>{t('msgSetting1')}</h5>
        <div className='my-2 font-bold text-gray-dark'>{t('timeDelivery')}</div>
        <div className='text-medium text-gray-dark'>カゴ落ち発生日から3日後の午後 12:00</div>
        <div className='mt-4 mb-2 font-bold text-gray-dark'>{t('msgContentEmail')}</div>
        <div className='mt-4 mb-2 font-bold text-gray-dark'>{t('msgContentLine')}</div>
        <div className='text-medium text-gray-dark'>[{t('lineMsg', { number: 1 })}]</div>
      </div>
    </div>
  );
};
