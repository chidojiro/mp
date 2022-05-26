import { ClassName } from '@/common/types';

import { ChatbotTable } from './ChatbotTable';
import { NotificationTable } from './NotificationTable';
import { PopupTable } from './PopupTable';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = ClassName & { actionType: string };

// eslint-disable-next-line no-empty-pattern
export const ReportsTable = ({ actionType, className }: Props) => {
  if (actionType === 'chatbot') return <ChatbotTable className={className} />;
  if (actionType === 'popup') return <PopupTable className={className} />;
  if (actionType === 'line-email') return <NotificationTable className={className} />;

  return null;
};
