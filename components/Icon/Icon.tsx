import React from 'react';
import Group from './icons/group.svg';
import Repeat from './icons/repeat.svg';
import Cart from './icons/cart.svg';
import CartQuestion from './icons/cart-question.svg';
import Chatbot from './icons/chatbot.svg';
import Download from './icons/download.svg';
import FreeShipping from './icons/free-shipping.svg';
import Line from './icons/line.svg';
import Mail from './icons/mail.svg';
import Mails from './icons/mails.svg';
import NoImage from './icons/no-image.svg';
import Upload from './icons/upload.svg';
import Check from '/public/images/check.svg';

const ICONS = {
  group: Group,
  repeat: Repeat,
  cart: Cart,
  'cart-question': CartQuestion,
  chatbot: Chatbot,
  download: Download,
  'free-shipping': FreeShipping,
  line: Line,
  mail: Mail,
  mails: Mails,
  'no-image': NoImage,
  upload: Upload,
  check: Check,
};

export type Name = keyof typeof ICONS;

export type Props = React.SVGProps<SVGSVGElement> & {
  size?: number;
  name: Name;
};

export const Icon = ({ name, size = 10, className, ...restProps }: Props) => {
  const Component = ICONS[name];

  return <Component className={className} width={size} height={size} {...restProps} />;
};
