import React from 'react';

import { useTranslation } from 'next-i18next';
import { FormProvider, UseFormReturn } from 'react-hook-form';

import { Form, RadioGroup } from '@/components/common';
import { useVisibilityControl } from '@/hooks';
import { Stepper } from '@/components/Stepper';
import { Section } from '@/components/Section';
import { DeliveryDateTimeInput } from '@/components/marketingAction/DeliveryDateTimeInput';
import { MessageContentPreviewType } from '@/components/marketingAction/MessageContentPreview';
import { PreviewOverlay } from '@/components/marketingAction/PreviewOverlay';
import { StepMessageReportPeriod, StepMessageTemplate } from '@/types';

import { ColorSettingSection } from '../ColorSettingsSection';
import { LineMessageContentSection } from '../LineMessageContentSection';
import { MailMessageContentSection } from '../MailMessageContentSection';
import { StepActions } from '../StepActions';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = { formMethods: UseFormReturn<any>; enableLine?: boolean; complete?: boolean };

// eslint-disable-next-line no-empty-pattern
export const Message2SettingsStep = React.forwardRef(
  ({ formMethods, enableLine, complete }: Props, ref: any) => {
    const { t } = useTranslation('marketingAction');

    const [previewType, setPreviewType] = React.useState<MessageContentPreviewType | null>(null);

    const control = useVisibilityControl();

    const { watch, reset, handleSubmit } = formMethods;
    const onValidSubmit = (v: any) => {
      reset(v);
    };
    const onInvalidSubmit = () => {
      window.alert(t('pleaseFillInAllFields'));
    };

    const mailHeadline = watch('mail_content.title');
    const mailBody = watch('mail_content.content');
    const lineBody = watch('line_messages.text_msg_content');

    const handleMailPreviewClick = () => {
      setPreviewType('mail');
      control.open();
    };

    const handleLinePreviewClick = () => {
      setPreviewType('line');
      control.open();
    };

    return (
      <Stepper.Item label={t('step2Setting')} complete={complete} ref={ref}>
        <FormProvider {...formMethods}>
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
            <Form.RadioGroup name='send_flag'>
              <div className='flex flex-col gap-2'>
                <RadioGroup.Option value='true' label={t('performStep2')} colorScheme='secondary' />
                <RadioGroup.Option
                  value='false'
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
              inputDateName='send_after_days'
              inputTimeName='send_at'
            />
          </Section>
          <Section>
            <Section.Title>{t('templateSelection')}</Section.Title>
            <Form.RadioGroup name='template'>
              <div className='flex flex-col gap-2'>
                <RadioGroup.Option
                  value={StepMessageTemplate.REVIEW}
                  label={t('reviewPromotion')}
                  colorScheme='secondary'
                />
                <RadioGroup.Option
                  value={StepMessageTemplate.RANKING}
                  label={t('rankingAppeal')}
                  colorScheme='secondary'
                />
              </div>
            </Form.RadioGroup>
          </Section>
          <Section>
            <Section.Title>{t('aggregationPeriod')}</Section.Title>
            <Form.RadioGroup name='report_period'>
              <div className='flex flex-col gap-2'>
                <RadioGroup.Option
                  value={StepMessageReportPeriod.MONTHLY}
                  label={t('1Month')}
                  colorScheme='secondary'
                />
                <RadioGroup.Option
                  value={StepMessageReportPeriod.WEEKLY}
                  label={t('1Week')}
                  colorScheme='secondary'
                />
              </div>
            </Form.RadioGroup>
          </Section>

          <MailMessageContentSection onPreviewClick={handleMailPreviewClick} />
          {!!enableLine && <LineMessageContentSection onPreviewClick={handleLinePreviewClick} />}

          <ColorSettingSection />

          <StepActions
            complete={complete}
            onPreviewClick={handleMailPreviewClick}
            onConfirmClick={handleSubmit(onValidSubmit, onInvalidSubmit)}
          />
        </FormProvider>
      </Stepper.Item>
    );
  }
);

Message2SettingsStep.displayName = 'Message2SettingsStep';
