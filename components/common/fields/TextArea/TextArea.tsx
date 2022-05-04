import React from 'react';
import classNames from 'classnames';

import { HTMLTextAreaProps } from '@/types';

// eslint-disable-next-line @typescript-eslint/ban-types
export type Props = HTMLTextAreaProps & {
  label?: React.ReactNode | false;
  error?: boolean;
};

// eslint-disable-next-line no-empty-pattern
export const TextArea = React.forwardRef(
  ({ className, label, error, ...restProps }: Props, ref: any) => {
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
            'w-full rounded min-h-[100px] outline-none p-2 text-medium',
            'border border-solid',
            error ? 'border-danger' : 'border-input focus:border-input-focus'
          )}
          {...restProps}
        />
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';
