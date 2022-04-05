import React from 'react';

import { useTranslation } from 'next-i18next';

import { ImageUploader } from '@/components';
import { ContentEditableUtils } from '@/utils';

import { Form } from '../../common';
import { Section } from '../../Section';
import { LinkButton } from '../LinkButton';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

// eslint-disable-next-line no-empty-pattern
export const EmailSettings = ({}: Props) => {
  const { t } = useTranslation('settings');

  const emailFooterRef = React.useRef<any>();
  const emailSignatureRef = React.useRef<any>();

  return (
    <div>
      <h5 className='mb-2.5'>{t('emailSettings')}</h5>
      <Section>
        <Section.Title>{t('emailFooter')}</Section.Title>
        <Section.Content>
          <Form.ContentEditable
            inputRef={emailFooterRef}
            name='emailFooter'
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
            name='emailSignature'
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
