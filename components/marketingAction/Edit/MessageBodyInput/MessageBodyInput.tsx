import React from 'react';
import { EditorState } from 'draft-js';
import { useFormContext } from 'react-hook-form';

import { Form } from '@/components/common';
import { Option } from '@/types';

import { getTextFromEditorState } from '../utils';

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
    const template = getTextFromEditorState(editorState);
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
                  required: (value: EditorState) => !!value && !!getTextFromEditorState(value),
                },
              }
            : undefined
        }
      />
    </div>
  );
};
