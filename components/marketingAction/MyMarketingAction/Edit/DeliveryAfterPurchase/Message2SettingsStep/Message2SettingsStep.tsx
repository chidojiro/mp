import React from 'react';

import { useTranslation } from 'next-i18next';
import { FormProvider, useForm } from 'react-hook-form';

import { Form, RadioGroup } from '@/components/common';
import { useVisibilityControl } from '@/hooks';
import { Stepper } from '@/components/Stepper';
import { Section } from '@/components/Section';

import { ColorSettingSection } from '../../ColorSettingsSection';
import { DeliveryDateTimeInput } from '../../DeliveryDateTimeInput';
import { LineMessageContentSection } from '../../LineMessageContentSection';
import { MailMessageContentSection } from '../../MailMessageContentSection';
import { MessageContentPreviewType } from '../../MessageContentPreview';
import { PreviewOverlay } from '../../PreviewOverlay';
import { StepActions } from '../../StepActions';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

// eslint-disable-next-line no-empty-pattern
export const Message2SettingsStep = ({}: Props) => {
  const { t } = useTranslation('marketingAction');

  const [previewType, setPreviewType] = React.useState<MessageContentPreviewType | null>(null);

  const control = useVisibilityControl();

  const methods = useForm({
    defaultValues: {
      useLine: true,
      aggregationPeriod: '1Month',
      templateSelection: 'reviewPromotion',
      withOrWithoutStep2: 'performStep2',
    } as any,
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

  const mailHeadline = watch('message2.mail.headline');
  const mailBody = watch('message2.mail.body');
  const lineBody = watch('message2.line.body');

  const handleMailPreviewClick = () => {
    setPreviewType('mail');
    control.open();
  };

  const handleLinePreviewClick = () => {
    setPreviewType('line');
    control.open();
  };

  return (
    <Stepper.Item label={t('step2Setting')} complete={isComplete}>
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
          <Section.Title>{t('withOrWithoutStep2')}</Section.Title>
          <Form.RadioGroup name='withOrWithoutStep2'>
            <div className='flex flex-col gap-2'>
              <RadioGroup.Option
                value='performStep2'
                label={t('performStep2')}
                colorScheme='secondary'
              />
              <RadioGroup.Option
                value='doNotPerformStep2PerformStep1Only'
                label={t('doNotPerformStep2PerformStep1Only')}
                colorScheme='secondary'
              />
            </div>
          </Form.RadioGroup>
        </Section>
        <Section>
          <Section.Title>{t('timeDelivery')}</Section.Title>
          <DeliveryDateTimeInput
            headingLabel={t('fromTheFirstDeliveryDate')}
            inputDateName='first_message.delivery_date'
            inputTimeName='first_message.delivery_time'
          />
        </Section>
        <Section>
          <Section.Title>{t('templateSelection')}</Section.Title>
          <Form.RadioGroup name='templateSelection'>
            <div className='flex flex-col gap-2'>
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
            </div>
          </Form.RadioGroup>
        </Section>
        <Section>
          <Section.Title>{t('aggregationPeriod')}</Section.Title>
          <Form.RadioGroup name='aggregationPeriod'>
            <div className='flex flex-col gap-2'>
              <RadioGroup.Option value='1Month' label={t('1Month')} colorScheme='secondary' />
              <RadioGroup.Option value='1Week' label={t('1Week')} colorScheme='secondary' />
            </div>
          </Form.RadioGroup>
        </Section>

        <MailMessageContentSection namePrefix='message2' onPreviewClick={handleMailPreviewClick} />
        <LineMessageContentSection namePrefix='message2' onPreviewClick={handleLinePreviewClick} />

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
