import React from 'react';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';

import { ClassName, MentionData, Option } from '@/types';

import { RichTextEditor, RichTextEditorProps, RichTextEditorRef } from '../RichTextEditor';

import { EmojiSign } from './EmojiSign';
import { VariableSign } from './VariableSign';

// eslint-disable-next-line @typescript-eslint/ban-types
export type Props = Omit<RichTextEditorProps, 'ref'> &
  ClassName & {
    error?: boolean;
    label?: React.ReactNode;
    name?: string;
    emoji?: boolean;
  };

// eslint-disable-next-line no-empty-pattern
export const MentionsEditor = React.forwardRef(
  ({ error, label, mentionOptions, emoji = false, className, ...restProps }: Props, ref: any) => {
    const { t } = useTranslation();
    const richTextEditorRef = React.useRef<RichTextEditorRef>();

    const handleVariableSelect = (option: Option<MentionData, string>) => {
      richTextEditorRef.current?.insertMention(option);
    };

    const handleEmojiSelect = (emoji: string) => {
      richTextEditorRef.current?.insertText(emoji);
    };

    return (
      <div className={className}>
        <input className='minimized' ref={ref} />
        {!!label && <label className='block mb-1 text-gray-5'>{label}</label>}
        <div
          className={classNames(
            'overflow-hidden',
            'border border-solid outline-none rounded',
            error ? 'border-danger' : 'border-input'
          )}
        >
          <div
            className={classNames(
              'flex justify-between items-center',
              'bg-gray-200',
              'py-1.5 px-2 text-medium text-gray-700'
            )}
          >
            {t('youCanEnterVariablesByPressingAtKey')}
            <div className='flex gap-1'>
              <VariableSign options={mentionOptions ?? []} onSelect={handleVariableSelect} />
              {!!emoji && <EmojiSign onSelect={handleEmojiSelect} />}
            </div>
          </div>
          <RichTextEditor {...restProps} mentionOptions={mentionOptions} ref={richTextEditorRef} />
        </div>
      </div>
    );
  }
);

MentionsEditor.displayName = 'MentionsEditor';
