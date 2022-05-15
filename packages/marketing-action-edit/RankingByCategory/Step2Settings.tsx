import { useTranslation } from 'next-i18next';

import { Message } from '@/marketing-action/ChatPreview/Message';
import { MessageBodyInput } from '../MessageBodyInput';
import { MarketingActionAlias } from '@/marketing-action/types';
import { useVariables } from '@/marketing-action/useVariables';

type Props = {
  isMonthly: boolean;
};

export const Step2Settings = ({ isMonthly }: Props) => {
  const { t } = useTranslation('marketingAction');

  const { variablesAsMentionOptions } = useVariables(
    MarketingActionAlias.HISTORY_PURCHASE_CATEGORY
  );

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
          mentionOptions={variablesAsMentionOptions}
        />
        <div className='font-bold text-medium text-secondary'>{t('note')}</div>
        <MessageBodyInput
          name='carousel.content'
          rawName='carousel.content_draft_raw'
          singleLine={true}
          showEmoji={false}
          className='mt-2'
          mentionOptions={variablesAsMentionOptions}
        />
      </div>
      <div className='w-[350px] bg-white rounded'>
        <Message />
      </div>
    </div>
  );
};
