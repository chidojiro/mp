import { useTranslation } from 'next-i18next';
import { EditorState } from 'draft-js';
import { useFormContext, useWatch } from 'react-hook-form';

import { Form, Icon } from '@/components/common';
import { RadioGroup } from '@/components/common/fields';
import { getTextFromEditorState } from '@/components/marketingAction/Edit/utils';
import { MessageContentPreview } from '@/components/marketingAction/MessageContentPreview';
import { Section } from '@/components/Section';
import { MarketingActionAlias, MentionData, Option } from '@/types';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {
  onPreviewClick: () => void;
  mentionOptions: Option<MentionData, string>[];
  marketingAction?: MarketingActionAlias;
};

// eslint-disable-next-line no-empty-pattern
export const LineMessageContentSection = ({
  onPreviewClick,
  mentionOptions,
  marketingAction,
}: Props) => {
  const { t } = useTranslation('marketingAction');

  const textMsgContentName = 'line_messages.text_msg_content';
  const flexMsgImageRatioName = 'line_messages.flex_msg_image_ratio';
  const flexMsgHeadName = 'line_messages.flex_msg_head';
  const pushMessageContentName = 'line_messages.push_msg_content';

  const { setValue } = useFormContext();

  const textMsgContent = useWatch({ name: textMsgContentName });
  const flexMsgHead = useWatch({ name: flexMsgHeadName });
  const displayLineMessage = useWatch({ name: 'line_messages.text_msg_display' });
  const flexMsgImageRatio = useWatch({ name: flexMsgImageRatioName });

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
            <>
              <Form.MentionsEditor
                className='mt-5'
                onChange={(editorState: EditorState) => {
                  const template = getTextFromEditorState(editorState);
                  setValue(textMsgContentName, template);
                  setValue(
                    `${textMsgContentName}_preview`,
                    getTextFromEditorState(editorState, true)
                  );
                }}
                emoji
                name={textMsgContentName + '_draft_raw'}
                mentionOptions={mentionOptions}
                rules={
                  displayLineMessage && {
                    validate: {
                      required: (value: EditorState) => !!value && !!getTextFromEditorState(value),
                    },
                  }
                }
              />
              <p className='mb-2 mt-5 text-secondary'>{t('textMessage')}</p>
              <Form.RadioGroup name={flexMsgImageRatioName}>
                <div className='flex flex-col gap-2'>
                  <RadioGroup.Option colorScheme='secondary' label={t('horizontal')} value='3:2' />
                  <RadioGroup.Option colorScheme='secondary' label={`1:1`} value='1:1' />
                  <RadioGroup.Option colorScheme='secondary' label={t('portrait')} value='3:4' />
                </div>
              </Form.RadioGroup>

              <p className='mb-2 mt-5 text-secondary'>{t('flexMessageImageRatio')}</p>
              <Form.MentionsEditor
                onChange={(editorState: EditorState) => {
                  const template = getTextFromEditorState(editorState);
                  setValue(flexMsgHeadName, template);
                }}
                singleLine
                name={flexMsgHeadName + '_draft_raw'}
                mentionOptions={mentionOptions}
                rules={
                  displayLineMessage && {
                    validate: {
                      required: (value: EditorState) => !!value && !!getTextFromEditorState(value),
                    },
                  }
                }
              />

              <p className='mb-2 mt-5 text-secondary'>
                {t('pushNotificationOrTalkListMessageChange')}
              </p>
              <p className='text-gray-700 text-medium mb-2'>
                {t('pushNotificationOrTalkListMessageChangeDescription')}
              </p>
              <Form.MentionsEditor
                onChange={(editorState: EditorState) => {
                  const template = getTextFromEditorState(editorState);
                  setValue(pushMessageContentName, template);
                }}
                emoji
                name={pushMessageContentName + '_draft_raw'}
                mentionOptions={mentionOptions}
                rules={
                  displayLineMessage && {
                    validate: {
                      required: (value: EditorState) => !!value && !!getTextFromEditorState(value),
                    },
                  }
                }
              />
            </>
          )}
        </div>
        <MessageContentPreview
          type='line'
          marketingAction={marketingAction}
          body={textMsgContent}
          headline={flexMsgHead}
          onPreviewClick={onPreviewClick}
          flexMessageImageRatio={flexMsgImageRatio}
        />
      </div>
    </Section>
  );
};
