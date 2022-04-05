import { useTranslation } from 'next-i18next';
import { useWatch } from 'react-hook-form';

import { Form, Icon, Section } from '@/components';

import { MessageBodyInput } from '../MessageBodyInput';
import { MessageContentPreview } from '../MessageContentPreview';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {
  namePrefix: string;
  onPreviewClick: () => void;
};

// eslint-disable-next-line no-empty-pattern
export const MailMessageContentSection = ({ namePrefix, onPreviewClick }: Props) => {
  const { t } = useTranslation('marketingAction');

  const headlineName = [namePrefix, 'mail.headline'].join('.');
  const bodyName = [namePrefix, 'mail.body'].join('.');

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
          <MessageBodyInput name={bodyName} />
        </div>
        <MessageContentPreview body={body} headline={headline} onPreviewClick={onPreviewClick} />
      </div>
    </Section>
  );
};
