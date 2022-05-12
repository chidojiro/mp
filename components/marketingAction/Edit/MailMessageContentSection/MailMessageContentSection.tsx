import { useTranslation } from 'next-i18next';
import { EditorState } from 'draft-js';
import { useFormContext, useWatch } from 'react-hook-form';

import { Form, Icon } from '@/components/common';
import { getPlainTextWithInterpolatedMentionValue } from '@/components/common/fields';
import { ColorGroup } from '@/components/marketingAction/ColorGroup';
import { MessageContentPreview } from '@/components/marketingAction/MessageContentPreview';
import { Section } from '@/components/Section';
import { Option } from '@/types';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {
  namePrefix?: string;
  onPreviewClick: () => void;
  mentionOptions: Option<string, string>[];
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
  const mailColor = useWatch({ name: 'mail_content.color' });

  const { setValue } = useFormContext();

  return (
    <Section>
      <Section.Title>
        <Icon name='mail' size={18} />
        {t('msgContentEmail')}
      </Section.Title>
      <Section.Description>{t('descriptionPlaceholder')}</Section.Description>
      <div className='flex gap-10'>
        <div className='flex-1'>
          <Form.MentionsEditor
            onChange={(editorState: EditorState) => {
              const template = getPlainTextWithInterpolatedMentionValue(editorState);
              setValue(headlineName, template);
            }}
            name={`${headlineName}_draft_raw`}
            mentionOptions={mentionOptions}
            rules={{
              validate: {
                required: (value: EditorState) =>
                  !!value && !!getPlainTextWithInterpolatedMentionValue(value),
              },
            }}
            label={<span className='text-secondary text-medium'>{t('headLines')}</span>}
          />
          <Form.MentionsEditor
            onChange={(editorState: EditorState) => {
              const template = getPlainTextWithInterpolatedMentionValue(editorState);
              setValue(bodyName, template);
            }}
            name={`${bodyName}_draft_raw`}
            mentionOptions={mentionOptions}
            rules={{
              validate: {
                required: (value: EditorState) =>
                  !!value && !!getPlainTextWithInterpolatedMentionValue(value),
              },
            }}
            label={<p className='text-secondary text-medium mt-5'>{t('bodyText')}</p>}
          />
          <div className='mt-5'>
            <div className='text-secondary text-medium mb-1'>{t('colorSettingsForBtn')}</div>
            <ColorGroup name='mail_content.color' />
          </div>
        </div>
        <MessageContentPreview
          color={mailColor}
          body={body}
          headline={headline}
          onPreviewClick={onPreviewClick}
        />
      </div>
    </Section>
  );
};
