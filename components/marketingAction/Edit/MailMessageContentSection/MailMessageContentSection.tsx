import { useTranslation } from 'next-i18next';
import { useWatch } from 'react-hook-form';

import { Form, Icon } from '@/components/common';
import { MessageContentPreview } from '@/components/marketingAction/MessageContentPreview';
import { Section } from '@/components/Section';
import { MentionData,Option } from '@/types';

import { MessageBodyInput } from '../MessageBodyInput';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {
  namePrefix?: string;
  onPreviewClick: () => void;
  mentionOptions: Option<MentionData, string>[];
};

// eslint-disable-next-line no-empty-pattern
export const MailMessageContentSection = ({
  namePrefix,
  onPreviewClick,
  mentionOptions,
}: Props) => {
  const { t } = useTranslation('marketingAction');

  const headlineName = [namePrefix, 'mail_content.title'].filter(Boolean).join('.');
  const bodyName = [namePrefix, 'mail_content.content'].filter(Boolean).join('.');

  const headline = useWatch({ name: headlineName });
  const body = useWatch({ name: bodyName });

  return (
    <Section>
      <Section.Title>
        <Icon name='mail' size={18} />
        {t('msgContentEmail')}
      </Section.Title>
      <Section.Description>{t('descriptionPlaceholder')}</Section.Description>
      <div className='flex gap-10'>
        <div className='flex-1'>
          <Form.TextArea
            name={headlineName}
            label={<span className='text-secondary text-medium'>{t('headLines')}</span>}
            rules={{ required: true }}
          />
          <MessageBodyInput
            mentionOptions={mentionOptions}
            name={bodyName}
            rawName={`${bodyName}_draft_raw`}
          />
        </div>
        <MessageContentPreview body={body} headline={headline} onPreviewClick={onPreviewClick} />
      </div>
    </Section>
  );
};
