import React from 'react';
import { EditorState } from 'draft-js';
import { useFormContext } from 'react-hook-form';

import { Form, getPlainTextWithInterpolatedMentionValue } from '@/components/common';
import { Option } from '@/types';

type Props = {
  name: string;
  rawName: string;
  showEmoji?: boolean;
  shouldValidate?: boolean;
  singleLine?: boolean;
  className?: string;
  mentionOptions?: Option<string, string>[];
};

export const MessageBodyInput = ({
  name,
  rawName,
  showEmoji = true,
  shouldValidate,
  singleLine = false,
  className,
  mentionOptions = [],
}: Props) => {
  const mentionRef = React.useRef<HTMLDivElement>(null);

  const { setValue } = useFormContext();

  return (
    <div ref={mentionRef}>
      <Form.MentionsEditor
        onChange={(editorState: EditorState) => {
          setValue(name, getPlainTextWithInterpolatedMentionValue(editorState));
        }}
        emoji={showEmoji}
        name={rawName}
        className={className || 'mt-5'}
        mentionOptions={mentionOptions}
        singleLine={singleLine}
        rules={shouldValidate ? { required: true } : undefined}
      />
    </div>
  );
};
