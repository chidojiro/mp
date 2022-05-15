import React from 'react';
import { EditorState } from 'draft-js';
import { useFormContext } from 'react-hook-form';

import { Form } from '@/common/Form';
import { getPlainTextWithInterpolatedMentionValue } from '@/common/RichTextEditor';
import { Option } from '@/common/types';

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

  const handleChange = (editorState: EditorState) => {
    const template = getPlainTextWithInterpolatedMentionValue(editorState);
    setValue(name, template);
  };
  return (
    <div ref={mentionRef}>
      <Form.MentionsEditor
        onChange={handleChange}
        emoji={showEmoji}
        name={rawName}
        className={className || 'mt-5'}
        mentionOptions={mentionOptions}
        singleLine={singleLine}
        rules={
          shouldValidate
            ? {
                validate: {
                  required: (value: EditorState) =>
                    !!value && !!getPlainTextWithInterpolatedMentionValue(value),
                },
              }
            : undefined
        }
      />
    </div>
  );
};
