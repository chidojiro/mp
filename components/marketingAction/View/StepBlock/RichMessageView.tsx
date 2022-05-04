import React from 'react';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';

import {
  RichTextEditor,
  RichTextEditorProps,
  RichTextEditorRef,
} from '@/components/common/fields/RichTextEditor';
import { ClassName } from '@/types';

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
    const { t } = useTranslation();
    const richTextEditorRef = React.useRef<RichTextEditorRef>();

    return (
      <div className={className}>
        <input className='minimized' ref={ref} />
        {!!label && <label className='block mb-1 text-gray-5'>{label}</label>}
        <div className={classNames('overflow-hidden', 'border border-solid outline-none rounded')}>
          <RichTextEditor {...restProps} readOnly ref={richTextEditorRef} />
        </div>
      </div>
    );
  }
);

RichMessageView.displayName = 'RichMessageView';
