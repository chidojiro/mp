import React from 'react';

import { useTranslation } from 'next-i18next';
import { FormProvider, useForm } from 'react-hook-form';

import { Form, RadioGroup } from '@/components/common';
import { useVisibilityControl } from '@/hooks';
import { Section } from '@/components/Section';
import { Stepper } from '@/components/Stepper';
import { DeliveryDateTimeInput } from '@/components/marketingAction/DeliveryDateTimeInput';
import { MessageContentPreviewType } from '@/components/marketingAction/MessageContentPreview';
import { PreviewOverlay } from '@/components/marketingAction/PreviewOverlay';

import { ColorSettingSection } from '../ColorSettingsSection';
import { LineMessageContentSection } from '../LineMessageContentSection';
import { MailMessageContentSection } from '../MailMessageContentSection';
import { StepActions } from '../StepActions';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

// eslint-disable-next-line no-empty-pattern
export const Message1SettingsStep = ({}: Props) => {
  const { t } = useTranslation('marketingAction');

  const [previewType, setPreviewType] = React.useState<MessageContentPreviewType | null>(null);

  const control = useVisibilityControl();

  const methods = useForm({
    defaultValues: { templateSelection: 'reviewPromotion', useLine: true } as any,
  });
  const {
    watch,
    formState: { isDirty, isSubmitSuccessful },
    reset,
    handleSubmit,
  } = methods;
  const onValidSubmit = (v: any) => {
    reset(v);
  };
  const onInvalidSubmit = () => {
    window.alert(t('pleaseFillInAllFields'));
  };
  const isComplete = isSubmitSuccessful && !isDirty;

  const mailHeadline = watch('message1.mail.headline');
  const mailBody = watch('message1.mail.body');
  const lineBody = watch('message1.line.body');

  const handleMailPreviewClick = () => {
    setPreviewType('mail');
    control.open();
  };

  const handleLinePreviewClick = () => {
    setPreviewType('line');
    control.open();
  };

  return (
    <Stepper.Item label={t('step1Setting')} complete={isComplete}>
      <FormProvider {...methods}>
        <PreviewOverlay
          control={control}
          defaultType={previewType ?? 'mail'}
          mailHeadline={mailHeadline}
          mailBody={mailBody}
          lineBody={lineBody}
        />
        <Section>
          <span className='text-gray-700 text-medium'>{t('descriptionPlaceholder')}</span>
        </Section>
        <Section>
          <Section.Title>{t('timeDelivery')}</Section.Title>
          <DeliveryDateTimeInput
            headingLabel={t('fromTheDateOfPurchase')}
            inputDateName='first_message.delivery_date'
            inputTimeName='first_message.delivery_time'
          />
        </Section>
        <Section>
          <Section.Title>{t('templateSelection')}</Section.Title>
          <Form.RadioGroup name='templateSelection' rules={{ required: true }}>
            <RadioGroup.Option
              value='reviewPromotion'
              label={t('reviewPromotion')}
              colorScheme='secondary'
            />
            <RadioGroup.Option
              value='rankingAppeal'
              label={t('rankingAppeal')}
              colorScheme='secondary'
            />
          </Form.RadioGroup>
        </Section>
        <MailMessageContentSection namePrefix='message1' onPreviewClick={handleMailPreviewClick} />
        <LineMessageContentSection namePrefix='message1' onPreviewClick={handleLinePreviewClick} />
        <ColorSettingSection />
        <StepActions
          complete={isComplete}
          onPreviewClick={handleMailPreviewClick}
          onConfirmClick={handleSubmit(onValidSubmit, onInvalidSubmit)}
        />
      </FormProvider>
    </Stepper.Item>
  );
};
