import { useTranslation } from 'next-i18next';

import { Form } from '@/components/common';
import { CHAT_COLORS, MESSAGE_COLORS } from '@/constants';
import { Option } from '@/types';

import { ColorOption } from './ColorOption';

type Props = {
  name: string;
  cols?: number;
  isFull?: boolean;
};

export const ColorGroup = ({ name, cols = 4, isFull = false }: Props) => {
  const { t } = useTranslation('marketingAction');
  const messageColors: Option<string>[] = [
    { label: t('orange'), value: MESSAGE_COLORS.orange },
    { label: t('skyBlue'), value: MESSAGE_COLORS.skyBlue },
    { label: t('pink'), value: MESSAGE_COLORS.pink },
    { label: t('mintGreen'), value: MESSAGE_COLORS.mintGreen },
    { label: t('red'), value: MESSAGE_COLORS.red },
    { label: t('blue'), value: MESSAGE_COLORS.blue },
    { label: t('navy'), value: MESSAGE_COLORS.navy },
    { label: t('brown'), value: MESSAGE_COLORS.brown },
  ];

  const chatColors: Option<string>[] = [
    { label: t('red'), value: CHAT_COLORS.red },
    { label: t('skyBlue'), value: CHAT_COLORS.skyBlue },
    { label: t('orange'), value: CHAT_COLORS.orange },
    { label: t('green'), value: CHAT_COLORS.green },
    { label: t('purple'), value: CHAT_COLORS.purple },
    { label: t('pink'), value: CHAT_COLORS.pink },
    { label: t('gray'), value: CHAT_COLORS.gray },
    { label: t('navy'), value: CHAT_COLORS.navy },
    { label: t('brown'), value: CHAT_COLORS.brown },
    { label: t('kaki'), value: CHAT_COLORS.kaki },
    { label: t('yellow'), value: CHAT_COLORS.yellow },
    { label: t('white'), value: CHAT_COLORS.white },
  ];

  const colors = isFull ? chatColors : messageColors;

  return (
    <Form.RadioGroup name={name} rules={{ required: true }}>
      <div className={`grid grid-cols-${cols}`}>
        {colors.map(color => (
          <ColorOption key={color.value} color={color} />
        ))}
      </div>
    </Form.RadioGroup>
  );
};
