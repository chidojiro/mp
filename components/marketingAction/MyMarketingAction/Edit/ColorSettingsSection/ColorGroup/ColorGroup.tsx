import { Form } from '@/components';
import { useTranslation } from 'next-i18next';
import { ColorOption } from './ColorOption';
import { Color } from './ColorOption/ColorOption';

type Props = {
  name: string;
};

export const ColorGroup = ({ name }: Props) => {
  const { t } = useTranslation('marketingAction');
  const colors: Color[] = [
    {
      label: t('orange'),
      value: 'orange',
      color: '#ffba00',
    },
    {
      label: t('skyBlue'),
      value: 'sky_blue',
      color: '#55c5d9',
    },
    {
      label: t('pink'),
      value: 'pink',
      color: '#F594AE',
    },
    {
      label: t('mintGreen'),
      value: 'mint_green',
      color: '#68CE97',
    },
    {
      label: t('red'),
      value: 'red',
      color: '#E63E28',
    },
    {
      label: t('blue'),
      value: 'blue',
      color: '#2167C6',
    },
    {
      label: t('navy'),
      value: 'navy',
      color: '#273A71',
    },
    {
      label: t('brown'),
      value: 'brown',
      color: '#81563C',
    },
  ];

  return (
    <Form.RadioGroup name={name} rules={{ required: true }}>
      <div className='grid grid-cols-4'>
        {colors.map(color => (
          <ColorOption key={color.value} color={color} />
        ))}
      </div>
    </Form.RadioGroup>
  );
};
