import React from 'react';
import classNames from 'classnames';

import { HTMLInputProps } from '@/types';

import { Icon } from '../../Icon';

type ColorScheme = 'primary' | 'secondary';

// eslint-disable-next-line @typescript-eslint/ban-types
export type Props = Omit<HTMLInputProps, 'ref'> & {
  label?: React.ReactNode;
  colorScheme?: ColorScheme;
  error?: boolean;
};

const activeBackgrounds: { [key in ColorScheme]: string } = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
};

// eslint-disable-next-line no-empty-pattern
export const Checkbox = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      checked: checkedProp,
      onChange,
      className,
      label,
      defaultChecked,
      colorScheme = 'primary',
      error,
      ...restProps
    }: Props,
    ref: any
  ) => {
    const [checkedState, setCheckedState] = React.useState(checkedProp ?? defaultChecked);

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
      setCheckedState(e.target.checked);
      onChange?.(e);
    };

    const checked = checkedProp ?? checkedState;

    const activeBackground = activeBackgrounds[colorScheme];

    return (
      <label
        className={classNames('mp-checkbox', 'flex items-center cursor-pointer', className)}
        role='switch'
        aria-checked={checked}
      >
        <div
          className={classNames(
            'w-4 h-4',
            'border border-solid border-input-focus focus:border-gray-400 rounded-sm',
            'flex items-center justify-center',
            'cursor-pointer',
            {
              'bg-white': !checked,
              [`${activeBackground} border-none`]: checked,
              '!border-danger': error,
            }
          )}
        >
          <Icon name='check' className='text-white' size={12} />
        </div>
        <input
          className='minimized'
          type='checkbox'
          ref={ref}
          checked={checked}
          defaultChecked={defaultChecked}
          onChange={handleChange}
          {...restProps}
        />
        {!!label && <span className='block ml-1'>{label}</span>}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
