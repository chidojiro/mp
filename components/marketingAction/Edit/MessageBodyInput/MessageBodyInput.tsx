import React from 'react';

import { useTranslation } from 'next-i18next';

import { Form } from '@/components/common';
import { Option } from '@/types';

type Props = {
  name: string;
  showEmoji?: boolean;
  shouldValidate?: boolean;
  singleLine?: boolean;
  className?: string;
  defaultOptions?: Option<string, string>[];
};

export const MessageBodyInput = ({
  name,
  showEmoji = true,
  shouldValidate,
  singleLine = false,
  className,
  defaultOptions,
}: Props) => {
  console.log(name);
  const { t } = useTranslation('marketingAction');
  const mentionRef = React.useRef<HTMLDivElement>(null);

  const options: Option<string, string>[] = defaultOptions || [
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
      <Form.MentionsEditor
        emoji={showEmoji}
        name={name}
        className={className || 'mt-5'}
        mentionOptions={options}
        singleLine={singleLine}
        rules={shouldValidate ? { required: true } : undefined}
      />
    </div>
  );
};
