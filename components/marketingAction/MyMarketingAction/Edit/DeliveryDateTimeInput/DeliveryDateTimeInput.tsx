import { useTranslation } from 'next-i18next';

import { Form } from '@/components/common';

type Props = {
  headingLabel: string;
  inputDateName: string;
  inputTimeName: string;
};

export const DeliveryDateTimeInput = ({ headingLabel, inputDateName, inputTimeName }: Props) => {
  const { t } = useTranslation('marketingAction');

  return (
    <>
      <div className='flex items-center text-gray-dark text-medium'>
        <div>{headingLabel}</div>
        <Form.Input
          type='number'
          name={inputDateName}
          className='w-20 mx-2.5'
          rules={{ required: true }}
        />
        {t('daysAfter')}
        <Form.TimeInput name={inputTimeName} className='ml-2.5' />
      </div>
    </>
  );
};
