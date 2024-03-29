import { useTranslation } from 'next-i18next';

import { ColorGroup } from '@/marketing-action/ColorGroup';
import { Section } from '@/common/Section';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

// eslint-disable-next-line no-empty-pattern
export const ColorSettingSection = ({}: Props) => {
  const { t } = useTranslation('marketingAction');

  return (
    <Section>
      <Section.Title>{t('colorSettings')}</Section.Title>
      <ColorGroup name='color' />
    </Section>
  );
};
