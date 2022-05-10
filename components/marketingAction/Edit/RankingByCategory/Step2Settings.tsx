import { useTranslation } from 'next-i18next';

import { Message } from '@/components/marketingAction/ChatPreview/Message';

import { MessageBodyInput } from '../MessageBodyInput';

type Props = {
  isMonthly: boolean;
};

export const Step2Settings = ({ isMonthly }: Props) => {
  const { t } = useTranslation('marketingAction');

  const periodOption = isMonthly
    ? { label: t('saleRankingPastMonth'), value: 'saleRankingPastMonth' }
    : { label: t('saleRankingPastWeek'), value: 'saleRankingPastWeek' };

  const options = [
    { label: t('productName'), value: 'productName' },
    { label: t('productDetails'), value: 'productDetail' },
    { label: t('amountIncludingTax'), value: 'amountIncludingTax' },
    { label: t('amountExcludingTax'), value: 'amountExcludingTax' },
    { label: t('saleRankingPastYear'), value: 'saleRankingPastYear' },
    periodOption,
  ];

  return (
    <div className='flex justify-between'>
      <div>
        <div className='mb-1 font-bold text-gray-dark'>{t('carouselDisplay')}</div>
        <div className='font-bold text-medium text-secondary'>{t('title')}</div>
        <MessageBodyInput
          name='carousel.title'
          rawName='carousel.title_draft_raw'
          singleLine={true}
          showEmoji={false}
          className='flex flex-row-reverse items-center mt-2 mb-4'
        />
        <div className='font-bold text-medium text-secondary'>{t('note')}</div>
        <MessageBodyInput
          name='carousel.content'
          rawName='carousel.content_draft_raw'
          singleLine={true}
          showEmoji={false}
          className='flex flex-row-reverse items-center mt-2'
        />
      </div>
      <div className='p-10 w-[350px] bg-white rounded'>
        <Message />
      </div>
    </div>
  );
};
