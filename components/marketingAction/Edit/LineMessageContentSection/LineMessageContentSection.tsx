import { useTranslation } from 'next-i18next';
import { useWatch } from 'react-hook-form';

import { Form, Icon } from '@/components/common';
import { RadioGroup } from '@/components/common/fields';
import { MessageContentPreview } from '@/components/marketingAction/MessageContentPreview';
import { Section } from '@/components/Section';
import { Option } from '@/types';

import { MessageBodyInput } from '../MessageBodyInput';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {
  namePrefix?: string;
  onPreviewClick: () => void;
  mentionOptions: Option<string, string>[];
};

// eslint-disable-next-line no-empty-pattern
export const LineMessageContentSection = ({
  namePrefix,
  onPreviewClick,
  mentionOptions,
}: Props) => {
  const { t } = useTranslation('marketingAction');

  const bodyName = [namePrefix, 'line_messages.text_msg_content'].filter(Boolean).join('.');

  const body = useWatch({ name: bodyName });
  const displayLineMessage = useWatch({ name: 'line_messages.text_msg_display' });

  return (
    <Section>
      <Section.Title>
        <Icon name='line' size={18} />
        {t('msgContentEmail')}
      </Section.Title>
      <Section.Description>{t('descriptionPlaceholder')}</Section.Description>

      <div className='flex gap-10'>
        <div className='flex-1'>
          <div>
            <p className='mb-2 text-secondary'>{t('textMessage')}</p>
            <Form.RadioGroup name='line_messages.text_msg_display'>
              <div className='flex flex-col gap-2'>
                <RadioGroup.Option colorScheme='secondary' label={t('displayMsg')} value='true' />
                <RadioGroup.Option colorScheme='secondary' label={t('noDisplay')} value='false' />
              </div>
            </Form.RadioGroup>
          </div>
          {!!displayLineMessage && (
            <MessageBodyInput
              mentionOptions={mentionOptions}
              name={bodyName}
              rawName={`${bodyName}_draft_raw`}
              showEmoji={false}
              shouldValidate={displayLineMessage}
            />
          )}
        </div>
        <MessageContentPreview type='line' body={body} onPreviewClick={onPreviewClick} />
      </div>
    </Section>
  );
};
