import { useTranslation } from 'next-i18next';

import { Form } from '@/common/Form';
import { RadioGroup } from '@/common/RadioGroup';
import { Section } from '@/common/Section';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

// eslint-disable-next-line no-empty-pattern
export const LineUsageSection = ({}: Props) => {
  const { t } = useTranslation('marketingAction');

  return (
    <Section>
      <Section.Title>{t('useLine')}</Section.Title>
      <Section.Description>{t('descriptionPlaceholder')}</Section.Description>
      <Form.RadioGroup name='enable_line'>
        <div className='flex flex-col gap-2'>
          <RadioGroup.Option colorScheme='secondary' label={t('lineOption')} value='true' />
          <RadioGroup.Option colorScheme='secondary' label={t('noLine')} value='false' />
        </div>
      </Form.RadioGroup>
    </Section>
  );
};
