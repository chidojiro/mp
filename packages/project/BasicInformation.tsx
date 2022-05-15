import { EmailField } from '@/common/EmailField';
import { Form } from '@/common/Form';
import { ImageUploader } from '@/common/ImageUploader';
import { Section } from '@/common/Section';
import { CDN_URL } from '@/env/constants';
import { useTranslation } from 'next-i18next';
import { useController, useFormContext } from 'react-hook-form';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

// eslint-disable-next-line no-empty-pattern
export const BasicInformation = ({}: Props) => {
  const { t } = useTranslation('settings');

  const { control, watch } = useFormContext();

  const imageController = useController({ control, name: 'brand_logo_temp' });
  const brandLogoId = watch('brand_logo');

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
          <ImageUploader
            originalUrl={brandLogoId ? `${CDN_URL}/${brandLogoId}` : undefined}
            value={imageController.field.value}
            onChange={imageController.field.onChange}
          />
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
