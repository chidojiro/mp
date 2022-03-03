import classNames from 'classnames';
import { HTMLTextAreaProps } from '@/types';
import React from 'react';

// eslint-disable-next-line @typescript-eslint/ban-types
export type Props = HTMLTextAreaProps & {
  label?: string | false;
};

// eslint-disable-next-line no-empty-pattern
export const TextArea = React.forwardRef(({ className, label, ...restProps }: Props, ref: any) => {
  return (
    <div className={classNames('mp-textarea', className)}>
      {!!label && (
        <label htmlFor={restProps.name} className='block mb-1 text-gray-5'>
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        className={classNames(
          'w-full rounded min-h-[100px] outline-none p-2',
          'border border-solid border-input focus:border-input'
        )}
        {...restProps}
      />
    </div>
  );
});

TextArea.displayName = 'TextArea';
