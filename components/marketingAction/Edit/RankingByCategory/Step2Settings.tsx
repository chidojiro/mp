import { useTranslation } from 'next-i18next';

import { Message } from '@/components/marketingAction/ChatPreview/Message';

import { MessageBodyInput } from '../MessageBodyInput';

type Props = {
  isMonthly: boolean;
};

export const Step2Settings = ({ isMonthly }: Props) => {
  const { t } = useTranslation('marketingAction');

  const rankingOptions = isMonthly
    ? { label: t('rankPosPastMonth'), value: 'rankPosPastMonth' }
    : { label: t('rankPosPastWeek'), value: 'rankPosPastWeek' };

  const titleOptions = [rankingOptions, { label: t('productName'), value: 'productName' }];

  const contentOptions = [
    { label: t('amountIncludingTax'), value: 'amountIncludingTax' },
    { label: t('productDetails'), value: 'productDetail' },
  ];

  return (
    <div className='flex justify-between'>
      <div>
        <div className='mb-1 font-bold text-gray-dark'>{t('carouselDisplay')}</div>
        <div className='font-bold text-medium text-secondary'>{t('title')}</div>
        <MessageBodyInput
          name='carousel.title'
          singleLine={true}
          showEmoji={false}
          defaultOptions={titleOptions}
          className='flex flex-row-reverse items-center mt-2 mb-4'
        />
        <div className='font-bold text-medium text-secondary'>{t('note')}</div>
        <MessageBodyInput
          name='carousel.content'
          singleLine={true}
          showEmoji={false}
          defaultOptions={contentOptions}
          className='flex flex-row-reverse items-center mt-2'
        />
      </div>
      <div className='p-10 w-[350px] bg-white rounded'>
        <Message />
      </div>
    </div>
  );
};
