import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { RichTextEditor, RichTextEditorProps, RichTextEditorRef } from '../RichTextEditor';
import { ClassName, Option } from '../types';
import { EmojiSign } from './EmojiSign';
import { VariableSign } from './VariableSign';

// eslint-disable-next-line @typescript-eslint/ban-types
export type MentionsEditorProps = Omit<RichTextEditorProps, 'ref'> &
  ClassName & {
    error?: boolean;
    label?: React.ReactNode;
    name?: string;
    emoji?: boolean;
  };

// eslint-disable-next-line no-empty-pattern
export const MentionsEditor = React.forwardRef(
  (
    {
      error,
      label,
      mentionOptions,
      emoji = false,
      className,
      singleLine,
      ...restProps
    }: MentionsEditorProps,
    ref: any
  ) => {
    const { t } = useTranslation();
    const richTextEditorRef = React.useRef<RichTextEditorRef>();

    const handleVariableSelect = (option: Option<string, string>) => {
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
          <RichTextEditor
            {...restProps}
            className={classNames('bg-white p-2', !singleLine && 'min-h-[100px]')}
            styleless
            mentionOptions={mentionOptions}
            ref={richTextEditorRef}
          />
        </div>
      </div>
    );
  }
);

MentionsEditor.displayName = 'MentionsEditor';
