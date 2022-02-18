import React from 'react';
import Group from '/public/images/group.svg';
import Repeat from '/public/images/repeat.svg';
import Cart from '/public/images/cart.svg';
import Check from '/public/images/check.svg';

const ICONS = {
  group: Group,
  repeat: Repeat,
  cart: Cart,
  check: Check,
};

export type Props = React.SVGProps<SVGSVGElement> & {
  size?: number;
  name: keyof typeof ICONS;
};

export const Icon = ({ name, size = 10, className, ...restProps }: Props) => {
  const Component = ICONS[name];

  return <Component className={className} width={size} height={size} {...restProps} />;
};
