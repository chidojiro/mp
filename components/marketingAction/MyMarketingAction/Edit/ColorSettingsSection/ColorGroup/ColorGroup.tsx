import { Form } from '@/components';
import { useTranslation } from 'next-i18next';
import { ColorOption } from './ColorOption';
import { Color } from './ColorOption/ColorOption';

type Props = {
  name: string;
  cols?: number;
  isFull?: boolean;
};

export const ColorGroup = ({ name, cols = 4, isFull = false }: Props) => {
  const { t } = useTranslation('marketingAction');
  const messageColors: Color[] = [
    { label: t('orange'), value: '#ffba00' },
    { label: t('skyBlue'), value: '#55c5d9' },
    { label: t('pink'), value: '#F594AE' },
    { label: t('mintGreen'), value: '#68CE97' },
    { label: t('red'), value: '#E63E28' },
    { label: t('blue'), value: '#2167C6' },
    { label: t('navy'), value: '#273A71' },
    { label: t('brown'), value: '#81563C' },
  ];

  const chatColors: Color[] = [
    { label: t('red'), value: '#E63E28' },
    { label: t('skyBlue'), value: '#55c5d9' },
    { label: t('orange'), value: '#ED6A00' },
    { label: t('green'), value: '#4DAB16' },
    { label: t('purple'), value: '#AA187C' },
    { label: t('pink'), value: '#EC307B' },
    { label: t('gray'), value: '#575656' },
    { label: t('navy'), value: '#052274' },
    { label: t('brown'), value: '#905900' },
    { label: t('kaki'), value: '#838221' },
    { label: t('yellow'), value: '#F9D616' },
    { label: t('white'), value: '#FFFFFF' },
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
