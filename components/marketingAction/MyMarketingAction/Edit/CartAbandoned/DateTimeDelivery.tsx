import { Form, Icon } from '@/components/common';
import { useTranslation } from 'next-i18next';

type Props = {
  fromTheDateText: string;
  inputDateName: string;
  inputTimeName: string;
};

export const DateTimeDelivery = ({ fromTheDateText, inputDateName, inputTimeName }: Props) => {
  const { t } = useTranslation('marketingAction');

  return (
    <>
      <div className='mb-1 font-semibold'>{t('timeDelivery')}</div>
      <div className='flex items-center text-gray-dark text-medium'>
        <div>{fromTheDateText}</div>
        <Form.Input type='number' name={inputDateName} className='w-20 mx-2.5' />
        {t('daysAfter')}
        <Form.Input
          type='time'
          innerLeft={
            <div className='flex items-center -mr-3'>
              <Icon name='clock' size={20} />
            </div>
          }
          name={inputTimeName}
          periods={[t('am'), t('pm')]}
          className='ml-2.5 w-[120px]'
        />
      </div>
    </>
  );
};
