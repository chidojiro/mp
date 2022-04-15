import { useTranslation } from 'next-i18next';

import { Section } from '@/components/Section';

import { ColorGroup } from './ColorGroup';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

// eslint-disable-next-line no-empty-pattern
export const ColorSettingSection = ({}: Props) => {
  const { t } = useTranslation('marketingAction');

  return (
    <Section>
      <Section.Title>{t('colorSettings')}</Section.Title>
      <ColorGroup name='first_message.colors' />
    </Section>
  );
};
