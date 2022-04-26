import { useTranslation } from 'next-i18next';

import { ImageUploader } from '@/components/ImageUploader';
import { Form } from '@/components/common';
import { Section } from '@/components/Section';

import { EmailField } from '../EmailField';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

// eslint-disable-next-line no-empty-pattern
export const BasicInformation = ({}: Props) => {
  const { t } = useTranslation('settings');

  return (
    <div>
      <h5 className='mb-2.5'>{t('basicInformationSetting')}</h5>
      <Section>
        <Section.Title>{t('brandName')}</Section.Title>
        <Section.Content>
          <Form.Input name='brand_name' className='w-[480px]' placeholder={t('store')} />
        </Section.Content>
      </Section>
      <Section>
        <Section.Title>{t('brandLogo')}</Section.Title>
        <Section.Content>
          <ImageUploader />
        </Section.Content>
      </Section>
      <Section>
        <Section.Title>{t('hoursOfOperation')}</Section.Title>
        <Section.Content>
          <Form.Input
            name='business_hours'
            className='w-[480px]'
            placeholder={t('hoursOfOperationPlaceholder')}
          />
        </Section.Content>
      </Section>
      <Section>
        <Section.Title>{t('emailAddressForInquiries')}</Section.Title>
        <Section.Content>
          <EmailField name='contact_email' className='w-[480px]' placeholder='sample@gmail.com' />
        </Section.Content>
      </Section>
      <Section>
        <Section.Title>{t('contactPhone')}</Section.Title>
        <Section.Content>
          <Form.Input name='contact_phone' className='w-[480px]' placeholder='0123-45-6789' />
        </Section.Content>
      </Section>
    </div>
  );
};
