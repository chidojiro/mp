import React from 'react';

import { useTranslation } from 'next-i18next';

import { ContentEditableUtils } from '@/utils';
import { Form } from '@/components/common';
import { Section } from '@/components/Section';

import { LinkButton } from './LinkButton';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

// eslint-disable-next-line no-empty-pattern
export const EmailSettings = ({}: Props) => {
  const { t } = useTranslation('settings');

  const emailFooterRef = React.useRef<HTMLInputElement>();
  const emailSignatureRef = React.useRef<HTMLInputElement>();

  return (
    <div>
      <h5 className='mb-2.5'>{t('emailSettings')}</h5>
      <Section>
        <Section.Title>{t('emailFooter')}</Section.Title>
        <Section.Content>
          <Form.ContentEditable
            inputRef={emailFooterRef}
            name='email_footer'
            label={
              <div className='flex mb-2 space-x-2'>
                <LinkButton onClick={() => ContentEditableUtils.underline(emailFooterRef)} />
              </div>
            }
          />
        </Section.Content>
      </Section>
      <Section>
        <Section.Title>{t('emailSignature')}</Section.Title>
        <Section.Content>
          <Form.ContentEditable
            inputRef={emailSignatureRef}
            name='email_signature'
            label={
              <div className='flex mb-2 space-x-2'>
                <LinkButton onClick={() => ContentEditableUtils.underline(emailSignatureRef)} />
              </div>
            }
          />
        </Section.Content>
      </Section>
    </div>
  );
};
