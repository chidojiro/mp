import React from 'react';

import { RichTextEditor, RichTextEditorProps, RichTextEditorRef } from '@/common/RichTextEditor';
import { ClassName } from '@/common/types';

// eslint-disable-next-line @typescript-eslint/ban-types
export type Props = Omit<RichTextEditorProps, 'ref'> &
  ClassName & {
    error?: boolean;
    label?: React.ReactNode;
    name?: string;
    emoji?: boolean;
  };

// eslint-disable-next-line no-empty-pattern
export const RichMessageView = React.forwardRef(
  ({ error, label, mentionOptions, emoji = false, className, ...restProps }: Props, ref: any) => {
    const richTextEditorRef = React.useRef<RichTextEditorRef>();

    return (
      <div className={className}>
        <input className='minimized' ref={ref} />
        {!!label && <label className='block mb-1 text-gray-5'>{label}</label>}
        <div>
          <RichTextEditor
            {...restProps}
            styleless
            readOnly
            className='min-h-fit'
            ref={richTextEditorRef}
          />
        </div>
      </div>
    );
  }
);

RichMessageView.displayName = 'RichMessageView';
