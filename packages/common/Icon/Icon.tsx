import React from 'react';

import { ChevronDownIcon, ChevronRightIcon, ChevronUpIcon } from '@heroicons/react/solid';

import Action from './icons/action.svg';
import Calendar from './icons/calendar.svg';
import Cart from './icons/cart.svg';
import CartQuestion from './icons/cart-question.svg';
import Chatbot from './icons/chatbot.svg';
import Chatbot2 from './icons/chatbot2.svg';
import Check from './icons/check.svg';
import CheckThin from './icons/check-thin.svg';
import ChevronLeft from './icons/chevron-left.svg';
import ChevronRightCircle from './icons/chevron-right-circle.svg';
import Clock from './icons/clock.svg';
import Close from './icons/close.svg';
import CustomSegment from './icons/custom-segment.svg';
import Dashboard from './icons/dashboard.svg';
import Document from './icons/document.svg';
import Download from './icons/download.svg';
import Emoji from './icons/emoji.svg';
import f0Icon from './icons/f0-status.svg';
import f1Graduate from './icons/f1-graduate.svg';
import f1SleepReturned from './icons/f1-sleep-returned.svg';
import f1Icon from './icons/f1-status.svg';
import f2Graduate from './icons/f2-graduate.svg';
import f2Icon from './icons/f2-status.svg';
import FreeShipping from './icons/free-shipping.svg';
import FreeShippingTemplatePath from './icons/free-shipping-template-path.svg';
import Group from './icons/group.svg';
import Home from './icons/home.svg';
import Line from './icons/line.svg';
import Link from './icons/link.svg';
import loyalFluctuate from './icons/loyal-fluctuate.svg';
import loyalSleepReturned from './icons/loyal-sleep-returned.svg';
import loyalIcon from './icons/loyal-status.svg';
import Mail from './icons/mail.svg';
import Mails from './icons/mails.svg';
import NoImage from './icons/no-image.svg';
import popoverClose from './icons/popover-close.svg';
import popoverTail from './icons/popover-tail.svg';
import PopularityRanking from './icons/popularity-ranking.svg';
import Popup from './icons/popup.svg';
import Ranking from './icons/ranking.svg';
import RankingByCategory from './icons/ranking-by-category.svg';
import Repeat from './icons/repeat.svg';
import semiloyalGraduate from './icons/semiloyal-graduate.svg';
import semiLoyalIcon from './icons/semiloyal-status.svg';
import Settings from './icons/settings.svg';
import sleepReturned from './icons/sleep-returned.svg';
import sleepIcon from './icons/sleep-status.svg';
import TriangleRight from './icons/triangle-right.svg';
import Upload from './icons/upload.svg';
import Variable from './icons/variable.svg';

const ICONS = {
  'chevron-left': ChevronLeft,
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
  'ranking-by-category': RankingByCategory,
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
  clock: Clock,
  chatbot2: Chatbot2,
  popup: Popup,
  variable: Variable,
  emoji: Emoji,
  'popularity-ranking': PopularityRanking,
  home: Home,
  close: Close,
  'chevron-right-circle': ChevronRightCircle,
  'chevron-right': ChevronRightIcon,
  'chevron-down': ChevronDownIcon,
  'chevron-up': ChevronUpIcon,
  dashboard: Dashboard,
  settings: Settings,
  action: Action,
  'custom-segment': CustomSegment,
  document: Document,
  calendar: Calendar,
  'check-thin': CheckThin,
  link: Link,
  'free-shipping-template-path': FreeShippingTemplatePath,
};

export type IconName = keyof typeof ICONS;

export type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
  name: IconName;
};

export const Icon = ({ name, size = 10, className, ...restProps }: IconProps) => {
  const Component = ICONS[name];

  return <Component className={className} width={size} height={size} {...restProps} />;
};
