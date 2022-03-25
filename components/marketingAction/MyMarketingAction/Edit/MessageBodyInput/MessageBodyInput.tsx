import { Form } from '@/components';
import { Option } from '@/types';
import { MentionUtils } from '@/utils';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { EmojiSign } from '../EmojiSign';
import { VariableSign } from '../VariableSign';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = { name: string; showEmoji?: boolean };

// eslint-disable-next-line no-empty-pattern
export const MessageBodyInput = ({ name, showEmoji = true }: Props) => {
  const { t } = useTranslation('marketingAction');

  const handleVariableSelect = (option: Option) => {
    MentionUtils.insert(option);
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
    <Form.Mentions
      name={name}
      className='mt-5'
      options={options}
      label={
        <div className='flex mb-2 space-x-2'>
          {showEmoji && <EmojiSign />}
          <VariableSign onSelect={handleVariableSelect} />
        </div>
      }
      rules={{ required: true }}
    />
  );
};
