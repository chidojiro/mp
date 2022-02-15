import React from 'react';
import classNames from 'classnames';
import { Children, ClassName, HTMLButtonProps } from 'types';

type Variant = 'link' | 'outline' | 'solid';
type ColorScheme = 'primary' | 'secondary' | 'default' | 'danger';
type Size = 'xs' | 'sm' | 'md' | 'lg';

const primaryBackgroundColors: { [key in Variant]: string } = {
  link: 'bg-none',
  outline: 'bg-none',
  solid: 'bg-primary',
};

const secondaryBackgroundColors: { [key in Variant]: string } = {
  link: 'bg-none',
  outline: 'bg-none',
  solid: 'bg-secondary',
};

const dangerBackgroundColors: { [key in Variant]: string } = {
  link: 'bg-none',
  outline: 'bg-none',
  solid: 'bg-danger',
};

const defaultBackgroundColors: { [key in Variant]: string } = {
  link: 'bg-none',
  outline: 'bg-none',
  solid: 'bg-white',
};

const backgroundColors: { [key in ColorScheme]: { [key in Variant]: string } } = {
  danger: dangerBackgroundColors,
  default: defaultBackgroundColors,
  primary: primaryBackgroundColors,
  secondary: secondaryBackgroundColors,
};

const primaryBorderColors: { [key in Variant]: string } = {
  link: 'border-none',
  outline: 'border-primary',
  solid: 'border-none',
};

const secondaryBorderColors: { [key in Variant]: string } = {
  link: 'border-none',
  outline: 'border-secondary',
  solid: 'border-none',
};

const dangerBorderColors: { [key in Variant]: string } = {
  link: 'border-none',
  outline: 'border-danger',
  solid: 'border-none',
};

const defaultBorderColors: { [key in Variant]: string } = {
  link: 'border-none',
  outline: 'border-white',
  solid: 'border-none',
};

const borderColors: { [key in ColorScheme]: { [key in Variant]: string } } = {
  danger: dangerBorderColors,
  default: defaultBorderColors,
  primary: primaryBorderColors,
  secondary: secondaryBorderColors,
};

const primaryTextColors: { [key in Variant]: string } = {
  link: 'text-primary',
  outline: 'text-white',
  solid: 'text-white',
};

const secondaryTextColors: { [key in Variant]: string } = {
  link: 'text-secondary',
  outline: 'text-secondary',
  solid: 'text-white',
};

const dangerTextColors: { [key in Variant]: string } = {
  link: 'text-danger',
  outline: 'text-danger',
  solid: 'text-white',
};

const defaultTextColors: { [key in Variant]: string } = {
  link: 'text-black',
  outline: 'text-black',
  solid: 'text-white',
};

const textColors: { [key in ColorScheme]: { [key in Variant]: string } } = {
  danger: dangerTextColors,
  default: defaultTextColors,
  primary: primaryTextColors,
  secondary: secondaryTextColors,
};

// eslint-disable-next-line @typescript-eslint/ban-types
export type Props = Children &
  ClassName &
  Pick<HTMLButtonProps, 'disabled' | 'type' | 'onClick'> & {
    variant?: Variant;
    // size?: Size;
    colorScheme?: ColorScheme;
    icon?: React.ReactNode;
    // loading?: boolean;
  };

export const Button = React.forwardRef<HTMLElement, Props>(
  (
    {
      variant = 'solid',
      colorScheme = 'primary',
      className,
      children,
      type = 'button',
      disabled,
      icon,
      ...restProps
    },
    ref: any
  ) => {
    const backgroundColor = backgroundColors[colorScheme][variant];

    const borderColor = borderColors[colorScheme][variant];

    const textColor = textColors[colorScheme][variant];

    return (
      <button
        ref={ref}
        {...restProps}
        type={type}
        className={classNames(
          'inline-flex justify-center items-center border rounded select-none',
          'px-6 py-2',
          textColor,
          backgroundColor,
          borderColor,
          {
            disabled,
          },
          className
        )}>
        {!!icon && <div className='mr-3'>{icon}</div>}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
