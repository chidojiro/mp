import { ClassName, Option } from '@/types';
import classNames from 'classnames';
import React from 'react';
import { MentionsInput, Mention } from 'react-mentions';
import style from './Mentions.module.css';

// eslint-disable-next-line @typescript-eslint/ban-types
export type Props = ClassName & {
  value?: string;
  onChange: (v: string) => void;
  placeholder?: string;
  options?: Option<string, string>[];
  label?: React.ReactNode;
  name?: string;
  error?: boolean;
};

// eslint-disable-next-line no-empty-pattern
export const Mentions = ({
  value,
  onChange,
  placeholder,
  options,
  label,
  className,
  name,
  error,
}: Props) => {
  return (
    <div className={classNames('mp-mentions', className, style['mp-mentions'])}>
      {!!label && (
        <label htmlFor={name} className='block mb-1 text-gray-5'>
          {label}
        </label>
      )}
      <MentionsInput
        className={classNames(
          'w-full rounded min-h-[100px] bg-white',
          'border border-solid',
          error ? 'border-danger' : 'border-input'
        )}
        value={value}
        onChange={e => {
          onChange(e.target.value);
        }}
        placeholder={placeholder}
      >
        <Mention
          trigger='@'
          data={
            // the whitespace is to workaround padding
            options?.map(({ value, label }) => ({ id: value, display: `   ${label}   ` })) ?? []
          }
          renderSuggestion={(suggestion, _, __, ___, isFocused) => (
            <div
              className={classNames(
                'px-2',
                'border-b border-solid border-input last-of-type:border-0',
                'first:rounded-t-xs last:rounded-b-xs',
                {
                  'bg-secondary text-white': isFocused,
                }
              )}
            >
              {suggestion.display?.trim()}
            </div>
          )}
        />
      </MentionsInput>
    </div>
  );
};
