import { Form } from '@/components';
import { Option } from '@/types';
import { MentionUtils } from '@/utils';
import React from 'react';
import { EmojiSign } from '../EmojiSign';
import { VariableSign } from '../VariableSign';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = { name: string; showEmoji?: boolean };

// eslint-disable-next-line no-empty-pattern
export const MessageBodyInput = ({ name, showEmoji = true }: Props) => {
  const handleVariableSelect = (option: Option) => {
    MentionUtils.insert(option);
  };

  const handleEmojiSelect = (emoji: string) => {
    document.execCommand('insertHTML', false, emoji);
  };

  return (
    <Form.Mentions
      name={name}
      className='mt-5'
      label={
        <div className='flex items-center justify-between w-full'>
          <VariableSign onSelect={handleVariableSelect} />
          {showEmoji && <EmojiSign onSelect={handleEmojiSelect} />}
        </div>
      }
      rules={{ required: true }}
    />
  );
};
