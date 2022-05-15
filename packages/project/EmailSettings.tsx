import React from 'react';
import { useTranslation } from 'next-i18next';
import { useFormContext } from 'react-hook-form';

import { Form } from '@/common/Form';
import { RichTextEditorRef } from '@/common/RichTextEditor';
import { Section } from '@/common/Section';

import { LinkButton } from './LinkButton';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

// eslint-disable-next-line no-empty-pattern
export const EmailSettings = ({}: Props) => {
  const { t } = useTranslation('settings');

  const emailFooterRef = React.useRef<RichTextEditorRef>();
  const emailSignatureRef = React.useRef<RichTextEditorRef>();

  const { setValue } = useFormContext();

  return (
    <div>
      <h5 className='mb-2.5'>{t('emailSettings')}</h5>
      <Section>
        <Section.Title>{t('emailFooter')}</Section.Title>
        <Section.Content>
          <Form.RichTextEditor
            inputRef={emailFooterRef}
            name='email_footer_draft_raw'
            onChange={() => {
              setValue('email_footer', emailFooterRef.current?.getHtml());
            }}
            label={
              <div className='flex mb-2 space-x-2'>
                <LinkButton onInsertConfirm={data => emailFooterRef.current?.insertLink(data)} />
              </div>
            }
          />
        </Section.Content>
      </Section>
      <Section>
        <Section.Title>{t('emailSignature')}</Section.Title>
        <Section.Content>
          <Form.RichTextEditor
            inputRef={emailSignatureRef}
            name='email_signature_draft_raw'
            onChange={() => {
              setValue('email_signature', emailSignatureRef.current?.getHtml());
            }}
            label={
              <div className='flex mb-2 space-x-2'>
                <LinkButton onInsertConfirm={data => emailSignatureRef.current?.insertLink(data)} />
              </div>
            }
          />
        </Section.Content>
      </Section>
    </div>
  );
};
