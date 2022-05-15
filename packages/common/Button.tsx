import React from 'react';
import classNames from 'classnames';

import { Icon } from './Icon';
import { Spinner } from './Spinner';
import { Children, ClassName, HTMLButtonProps } from './types';

import styles from './Button.module.css';

type Variant = 'link' | 'outline' | 'solid';
type ColorScheme = 'primary' | 'secondary' | 'default' | 'danger' | 'green' | 'negative';
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

const greenBackgroundColors: { [key in Variant]: string } = {
  link: 'bg-none',
  outline: 'bg-white',
  solid: 'bg-mint-green',
};

const negativeBackgroundColors: { [key in Variant]: string } = {
  link: 'bg-none',
  outline: 'bg-white',
  solid: 'bg-gray-600',
};

const backgroundColors: { [key in ColorScheme]: { [key in Variant]: string } } = {
  danger: dangerBackgroundColors,
  default: defaultBackgroundColors,
  primary: primaryBackgroundColors,
  secondary: secondaryBackgroundColors,
  green: greenBackgroundColors,
  negative: negativeBackgroundColors,
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

const greenBorderColors: { [key in Variant]: string } = {
  link: 'border-none',
  outline: 'border-mint-green',
  solid: 'border-none',
};

const negativeBorderColors: { [key in Variant]: string } = {
  link: 'border-none',
  outline: 'border-gray-600',
  solid: 'border-none',
};

const borderColors: { [key in ColorScheme]: { [key in Variant]: string } } = {
  danger: dangerBorderColors,
  default: defaultBorderColors,
  primary: primaryBorderColors,
  secondary: secondaryBorderColors,
  green: greenBorderColors,
  negative: negativeBorderColors,
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

const greenTextColors: { [key in Variant]: string } = {
  link: 'text-mint-green',
  outline: 'text-mint-green',
  solid: 'text-white',
};

const negativeTextColors: { [key in Variant]: string } = {
  link: 'text-gray-600',
  outline: 'text-gray-600',
  solid: 'text-white',
};

const textColors: { [key in ColorScheme]: { [key in Variant]: string } } = {
  danger: dangerTextColors,
  default: defaultTextColors,
  primary: primaryTextColors,
  secondary: secondaryTextColors,
  green: greenTextColors,
  negative: negativeTextColors,
};

// eslint-disable-next-line @typescript-eslint/ban-types
export type ButtonProps = Children &
  ClassName &
  Pick<HTMLButtonProps, 'disabled' | 'type' | 'onClick'> & {
    variant?: Variant;
    // size?: Size;
    colorScheme?: ColorScheme;
    icon?: React.ReactNode;
    loading?: boolean;
    complete?: boolean;
    style?: React.CSSProperties;
  };
type Ref = HTMLButtonElement;
export const Button = React.forwardRef<Ref, ButtonProps>(
  (
    {
      variant = 'solid',
      colorScheme = 'primary',
      className,
      children,
      type = 'button',
      disabled,
      icon,
      style,
      loading,
      complete,
      ...restProps
    },
    ref
  ) => {
    const backgroundColor = backgroundColors[colorScheme][variant];
    const borderColor = borderColors[colorScheme][variant];
    const textColor = textColors[colorScheme][variant];
    const underline = variant === 'link' && 'underline';
    const fontWeigh = variant !== 'link' && 'font-bold';
    const padding = variant !== 'link' && 'px-6 py-2';

    const hasIcon = !!loading || !!complete || !!icon;

    const renderIcon = () => {
      if (loading) return <Spinner className={classNames(textColor, 'mr-3')} size={18} />;

      if (complete)
        return (
          <Icon className={classNames(styles['checkmark'], 'mr-3')} name='check-thin' size={18} />
        );

      if (icon) return <span className='mr-3'>{icon}</span>;

      return null;
    };

    return (
      <button
        ref={ref}
        {...restProps}
        type={type}
        className={classNames(
          'inline-flex justify-center items-center border rounded select-none filter hover:brightness-[0.85] transition-all',
          padding,
          textColor,
          backgroundColor,
          borderColor,
          underline,
          fontWeigh,
          {
            disabled: disabled || loading,
          },
          className
        )}
        style={style}
      >
        <div className='flex items-center justify-center'>
          {!!hasIcon && renderIcon()}
          {children}
        </div>
      </button>
    );
  }
);

Button.displayName = 'Button';
