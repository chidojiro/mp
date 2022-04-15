import React from 'react';

import { useTranslation } from 'next-i18next';

import { Form } from '@/components/common';
import { Option } from '@/types';
import { ContentEditableUtils } from '@/utils';

import { EmojiSign } from '../EmojiSign';
import { VariableSign } from '../VariableSign';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = { name: string; showEmoji?: boolean };

// eslint-disable-next-line no-empty-pattern
export const MessageBodyInput = ({ name, showEmoji = true }: Props) => {
  const { t } = useTranslation('marketingAction');
  const mentionRef = React.useRef<HTMLDivElement>(null);

  const mentionContainsSelection = () => {
    const target = window.getSelection()?.anchorNode?.parentNode;
    return mentionRef.current?.contains(target as Node);
  };

  const handleVariableSelect = (option: Option) => {
    if (mentionContainsSelection()) {
      ContentEditableUtils.insert(option);
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    if (mentionContainsSelection()) {
      document.execCommand('insertHTML', false, emoji);
    }
  };

  const options = [
    { label: t('customerName'), value: 'customerName' },
    { label: t('brandName'), value: 'brandName' },
    { label: t('businessHours'), value: 'businessHours' },
    { label: t('emailAddressForInquiries'), value: 'emailAddressForInquiries' },
    { label: t('telephoneNumberForInquiry'), value: 'telephoneNumberForInquiry' },
    { label: t('topPageUrl'), value: 'topPageUrl' },
    { label: t('thanksPageUrl'), value: 'thanksPageUrl' },
    { label: t('cartPageUrl'), value: 'cartPageUrl' },
    { label: t('productDetailPageUrl'), value: 'productDetailPageUrl' },
    { label: t('categoryPageUrl'), value: 'categoryPageUrl' },
  ];

  return (
    <div ref={mentionRef}>
      <Form.ContentEditable
        name={name}
        className='mt-5'
        options={options}
        label={
          <div className='flex mb-2 space-x-2'>
            {showEmoji && <EmojiSign onSelect={handleEmojiSelect} />}
            <VariableSign onSelect={handleVariableSelect} />
          </div>
        }
        rules={{ required: true }}
      />
    </div>
  );
};
