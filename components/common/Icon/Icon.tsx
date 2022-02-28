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
import Check from './icons/check.svg';
import Ranking from './icons/ranking.svg';
import TriangleRight from './icons/triangle-right.svg';
import f0Icon from './icons/f0-status.svg';
import f1Icon from './icons/f1-status.svg';
import f2Icon from './icons/f2-status.svg';
import semiLoyalIcon from './icons/semiloyal-status.svg';
import loyalIcon from './icons/loyal-status.svg';
import sleepIcon from './icons/sleep-status.svg';
import popoverClose from './icons/popover-close.svg';
import popoverTail from './icons/popover-tail.svg';
import f1Graduate from './icons/f1-graduate.svg';
import f2Graduate from './icons/f2-graduate.svg';
import semiloyalGraduate from './icons/semiloyal-graduate.svg';
import loyalFluctuate from './icons/loyal-fluctuate.svg';
import sleepReturned from './icons/sleep-returned.svg';
import f1SleepReturned from './icons/f1-sleep-returned.svg';
import loyalSleepReturned from './icons/loyal-sleep-returned.svg';

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
  ranking: Ranking,
  'triangle-right': TriangleRight,
  'f0-status': f0Icon,
  'f1-status': f1Icon,
  'f2-status': f2Icon,
  'semi-loyal-status': semiLoyalIcon,
  'loyal-status': loyalIcon,
  'sleep-status': sleepIcon,
  'popover-close': popoverClose,
  'popover-tail': popoverTail,
  'f1-graduate': f1Graduate,
  'f2-graduate': f2Graduate,
  'semi-loyal-graduate': semiloyalGraduate,
  'loyal-fluctuate': loyalFluctuate,
  'sleep-returned': sleepReturned,
  'f1-sleep-returned': f1SleepReturned,
  'loyal-sleep-returned': loyalSleepReturned,
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
