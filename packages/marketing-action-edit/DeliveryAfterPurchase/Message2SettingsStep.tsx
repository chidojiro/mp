import { Form } from '@/common/Form';
import { RadioGroup } from '@/common/RadioGroup';
import { Section } from '@/common/Section';
import { Stepper } from '@/common/Stepper';
import { useVisibilityControl } from '@/common/useVisibilityControl';
import { DeliveryDateTimeInput } from '@/marketing-action/DeliveryDateTimeInput';
import { MessageContentPreviewType } from '@/marketing-action/MessageContentPreview';
import { PreviewOverlay } from '@/marketing-action/PreviewOverlay';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { FormProvider, UseFormReturn } from 'react-hook-form';
import { LineMessageContentSection } from '../LineMessageContentSection';
import { MailMessageContentSection } from '../MailMessageContentSection';
import { StepActions } from '../StepActions';
import { MarketingActionAlias } from '@/marketing-action/types';
import { StepMessageTemplate } from '@/marketing-action/types';
import { StepMessageReportPeriod } from '@/marketing-action/types';
import { useVariables } from '@/marketing-action/useVariables';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {
  formMethods: UseFormReturn<any>;
  enableLine?: boolean;
  confirmed?: boolean;
  onConfirmationChange: (isConfirmed: boolean) => void;
};

// eslint-disable-next-line no-empty-pattern
export const Message2SettingsStep = React.forwardRef(
  ({ formMethods, enableLine, confirmed, onConfirmationChange }: Props, ref: any) => {
    const { t } = useTranslation('marketingAction');

    const [previewType, setPreviewType] = React.useState<MessageContentPreviewType | null>(null);

    const control = useVisibilityControl();

    const { watch, reset, handleSubmit } = formMethods;
    const onValidSubmit = (v: any) => {
      onConfirmationChange(true);
      reset(v);
    };
    const onInvalidSubmit = () => {
      window.alert(t('pleaseFillInAllFields'));
    };

    const mailContent = watch('mail_content');
    const lineMessage = watch('line_messages');

    const handleMailPreviewClick = () => {
      setPreviewType('mail');
      control.open();
    };

    const handleLinePreviewClick = () => {
      setPreviewType('line');
      control.open();
    };

    const { variablesAsMentionOptions } = useVariables(MarketingActionAlias.AFTER_PURCHASE);

    return (
      <Stepper.Item label={t('step2Setting')} complete={confirmed} ref={ref}>
        <FormProvider {...formMethods}>
          <PreviewOverlay
            control={control}
            defaultType={previewType ?? 'mail'}
            mailContent={mailContent}
            lineMessage={lineMessage}
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

          <MailMessageContentSection
            mentionOptions={variablesAsMentionOptions}
            onPreviewClick={handleMailPreviewClick}
          />
          {!!enableLine && (
            <LineMessageContentSection
              marketingAction={MarketingActionAlias.AFTER_PURCHASE}
              mentionOptions={variablesAsMentionOptions}
              onPreviewClick={handleLinePreviewClick}
            />
          )}

          <StepActions
            onConfirmClick={
              confirmed
                ? () => onConfirmationChange(false)
                : handleSubmit(onValidSubmit, onInvalidSubmit)
            }
            complete={confirmed}
            onPreviewClick={handleMailPreviewClick}
          />
        </FormProvider>
      </Stepper.Item>
    );
  }
);

Message2SettingsStep.displayName = 'Message2SettingsStep';
