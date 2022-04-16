import { useTranslation } from 'next-i18next';

import { TimeUtils } from '@/utils';
import { StepMessage } from '@/types';

import { Answer } from './Answer';

type Props = {
  message: StepMessage;
  fromTheDateText: string;
};

export const TimeDelivery = ({ message, fromTheDateText }: Props) => {
  const { t } = useTranslation('marketingAction');

  const timePeriod = TimeUtils.isPM(message.send_at) ? 'pmTime' : 'amTime';

  const getTimeDelivery = (days: number, time: string) => {
    return t('timeDeliverySettings', { from_the_date_text: fromTheDateText, days, time });
  };

  const timeDelivery = getTimeDelivery(
    message.send_after_days,
    t(timePeriod, { time: message.send_at })
  );

  return <Answer name={t('timeDelivery')}>{timeDelivery}</Answer>;
};
