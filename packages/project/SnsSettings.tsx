import { useTranslation } from 'next-i18next';

import { Form } from '@/common/Form';
import { Section } from '@/common/Section';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

// eslint-disable-next-line no-empty-pattern
export const SnsSettings = ({}: Props) => {
  const { t } = useTranslation('settings');

  return (
    <div>
      <h5 className='mb-2.5'>{t('snsSettings')}</h5>
      <Section>
        <Section.Title>Twitter ID</Section.Title>
        <Section.Content>
          <Form.Input name='twitter_id' className='w-[480px]' placeholder='@twitterid' />
        </Section.Content>
      </Section>
      <Section>
        <Section.Title>Instagram ID</Section.Title>
        <Section.Content>
          <Form.Input name='instagram_id' className='w-[480px]' placeholder='@instagramid' />
        </Section.Content>
      </Section>
      <Section>
        <Section.Title>Facebook ID</Section.Title>
        <Section.Content>
          <Form.Input name='facebook_id' className='w-[480px]' placeholder='facebookid' />
        </Section.Content>
      </Section>
      <Section>
        <Section.Title>LINE ID</Section.Title>
        <Section.Content>
          <Form.Input name='line_id' className='w-[480px]' placeholder='@lineid' />
        </Section.Content>
      </Section>
    </div>
  );
};
