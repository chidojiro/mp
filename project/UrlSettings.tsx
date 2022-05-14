import { useTranslation } from 'next-i18next';

import { Form } from '@/components/common';
import { Section } from '@/components/Section';

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
          <Form.Input name='top_page_url' className='w-[480px]' />
        </Section.Content>
      </Section>
      <Section>
        <Section.Title>{t('thanksPageUrl')}</Section.Title>
        <Section.Content>
          <Form.Input name='thanks_page_url' className='w-[480px]' />
        </Section.Content>
      </Section>
      <Section>
        <Section.Title>{t('cartPageUrl')}</Section.Title>
        <Section.Content>
          <Form.Input name='cart_page_url' className='w-[480px]' />
        </Section.Content>
      </Section>
      <Section>
        <Section.Title>{t('productDetailPageUrl')}</Section.Title>
        <Section.Content>
          <Form.Input name='product_detail_page_url' className='w-[480px]' />
        </Section.Content>
      </Section>
      <Section>
        <Section.Title>{t('categoryPageUrl')}</Section.Title>
        <Section.Content>
          <Form.Input name='category_page_url' className='w-[480px]' />
        </Section.Content>
      </Section>
    </div>
  );
};
