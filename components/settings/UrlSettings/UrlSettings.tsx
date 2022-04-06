import { useTranslation } from 'next-i18next';

import { Form } from '../../common';
import { Section } from '../../Section';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

// eslint-disable-next-line no-empty-pattern
export const UrlSettings = ({}: Props) => {
  const { t } = useTranslation('settings');

  return (
    <div>
      <h5 className='mb-2.5'>{t('urlSettings')}</h5>
      <Section>
        <Section.Title>{t('topPageUrl')}</Section.Title>
        <Section.Content>
          <Form.Input name='topPageUrl' className='w-[480px]' placeholder='sample@gmail.com' />
        </Section.Content>
      </Section>
      <Section>
        <Section.Title>{t('thanksPageUrl')}</Section.Title>
        <Section.Content>
          <Form.Input name='thanksPageUrl' className='w-[480px]' placeholder='sample@gmail.com' />
        </Section.Content>
      </Section>
      <Section>
        <Section.Title>{t('cartPageUrl')}</Section.Title>
        <Section.Content>
          <Form.Input name='cartPageUrl' className='w-[480px]' placeholder='sample@gmail.com' />
        </Section.Content>
      </Section>
      <Section>
        <Section.Title>{t('productDetailPageUrl')}</Section.Title>
        <Section.Content>
          <Form.Input
            name='productDetailPageUrl'
            className='w-[480px]'
            placeholder='sample@gmail.com'
          />
        </Section.Content>
      </Section>
      <Section>
        <Section.Title>{t('categoryPageUrl')}</Section.Title>
        <Section.Content>
          <Form.Input name='categoryPageUrl' className='w-[480px]' placeholder='sample@gmail.com' />
        </Section.Content>
      </Section>
    </div>
  );
};
