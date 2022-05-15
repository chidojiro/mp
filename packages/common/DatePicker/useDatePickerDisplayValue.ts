import { useTranslation } from 'next-i18next';
import { format, getDay } from 'date-fns';

const jaDisplayFormat = 'yyyy年M月d日';
const enDisplayFormat = 'yyyy/MM/dd';

const dayTranslationKeyMap = {
  0: 'mon',
  1: 'tue',
  2: 'wed',
  3: 'thu',
  4: 'fri',
  5: 'sat',
  6: 'sun',
};

export const useDatePickerDisplayValue = (date?: Date) => {
  const { t, i18n } = useTranslation();

  if (!date) return;

  const day = getDay(date);
  const displayFormat = i18n.language === 'ja' ? jaDisplayFormat : enDisplayFormat;

  return format(date, displayFormat) + ` (${t(dayTranslationKeyMap[day])})`;
};
