import { useTranslation } from 'next-i18next';

import { Message } from '@/components/marketingAction/ChatPreview/Message';
import { useVariables } from '@/hooks';
import { MarketingActionAlias, MentionData, Option } from '@/types';

import { MessageBodyInput } from '../MessageBodyInput';

type Props = {
  isMonthly: boolean;
};

export const Step2Settings = ({ isMonthly }: Props) => {
  const { t } = useTranslation('marketingAction');

  const periodOption = isMonthly
    ? { label: t('saleRankingPastMonth'), value: 'saleRankingPastMonth' }
    : { label: t('saleRankingPastWeek'), value: 'saleRankingPastWeek' };

  const { data: variables } = useVariables(MarketingActionAlias.HISTORY_PURCHASE_CATEGORY);
  const mentionOptions = variables.map(
    data =>
      ({
        label: data.name_display,
        value: data,
      } as Option<MentionData, string>)
  );

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
      <div className='flex-1 mr-10'>
        <div className='mb-1 font-bold text-gray-dark'>{t('carouselDisplay')}</div>
        <div className='font-bold text-medium text-secondary'>{t('title')}</div>
        <MessageBodyInput
          name='carousel.title'
          rawName='carousel.title_draft_raw'
          singleLine={true}
          showEmoji={false}
          className='mt-2 mb-4'
          mentionOptions={mentionOptions}
        />
        <div className='font-bold text-medium text-secondary'>{t('note')}</div>
        <MessageBodyInput
          name='carousel.content'
          rawName='carousel.content_draft_raw'
          singleLine={true}
          showEmoji={false}
          className='mt-2'
          mentionOptions={mentionOptions}
        />
      </div>
      <div className='w-[350px] bg-white rounded'>
        <Message />
      </div>
    </div>
  );
};
