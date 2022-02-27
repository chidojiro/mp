import classNames from 'classnames';
import { HTMLInputProps } from '@/types';
import React from 'react';

type ColorScheme = 'primary' | 'secondary';

// eslint-disable-next-line @typescript-eslint/ban-types
export type Props = Omit<HTMLInputProps, 'ref'> & { label?: string; colorScheme?: ColorScheme };

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
        className={classNames('mp-checkbox', 'flex items-center', className)}
        role='switch'
        aria-checked={checked}
      >
        <div
          className={classNames(
            'w-4 h-4',
            'border border-solid border-input focus:border-input-focus rounded-sm',
            {
              'bg-white': !checked,
              [`${activeBackground} border-none`]: checked,
            }
          )}
        ></div>
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
