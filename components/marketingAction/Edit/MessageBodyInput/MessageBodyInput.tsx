import React from 'react';

import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';

import { Form } from '@/components/common';
import { Option } from '@/types';
import { ContentEditableUtils } from '@/utils';

import { VariableSign } from '../VariableSign';

const EmojiSign = dynamic<any>(() => import('../EmojiSign').then(module => module.EmojiSign));

type Props = {
  name: string;
  showEmoji?: boolean;
  shouldValidate?: boolean;
  singleLine?: boolean;
  className?: string;
  defaultOptions?: Option[];
};

export const MessageBodyInput = ({
  name,
  showEmoji = true,
  shouldValidate,
  singleLine = false,
  className,
  defaultOptions,
}: Props) => {
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

  const options = defaultOptions || [
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

  const classLabel = showEmoji ? 'flex mb-2 space-x-2' : '';

  return (
    <div ref={mentionRef}>
      <Form.ContentEditable
        name={name}
        className={className || 'mt-5'}
        options={options}
        singleLine={singleLine}
        label={
          <div className={classLabel}>
            {showEmoji && <EmojiSign onSelect={handleEmojiSelect} />}
            <VariableSign onSelect={handleVariableSelect} defaultOptions={options} />
          </div>
        }
        rules={shouldValidate ? { required: true } : undefined}
      />
    </div>
  );
};
