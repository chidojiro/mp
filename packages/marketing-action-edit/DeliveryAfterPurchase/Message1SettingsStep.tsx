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
import { useVariables } from '@/marketing-action/useVariables';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {
  formMethods: UseFormReturn<any>;
  enableLine?: boolean;
  confirmed?: boolean;
  onConfirmationChange: (isConfirmed: boolean) => void;
};

// eslint-disable-next-line no-empty-pattern
export const Message1SettingsStep = React.forwardRef(
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

    const mailHeadline = watch('mail_content.title');
    const mailBody = watch('mail_content.content');
    const lineBody = watch('line_messages.text_msg_content');
    const lineHeadline = watch('line_messages.flex_msg_head');

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
      <Stepper.Item label={t('step1Setting')} complete={confirmed} ref={ref}>
        <FormProvider {...formMethods}>
          <PreviewOverlay
            control={control}
            defaultType={previewType ?? 'mail'}
            mailHeadline={mailHeadline}
            mailBody={mailBody}
            lineHeadline={lineHeadline}
            lineBody={lineBody}
          />
          <Section>
            <span className='text-gray-700 text-medium'>{t('descriptionPlaceholder')}</span>
          </Section>
          <Section>
            <Section.Title>{t('timeDelivery')}</Section.Title>
            <DeliveryDateTimeInput
              headingLabel={t('fromTheDateOfPurchase')}
              inputDateName='send_after_days'
              inputTimeName='send_at'
            />
          </Section>
          <Section>
            <Section.Title>{t('templateSelection')}</Section.Title>
            <Form.RadioGroup name='template' rules={{ required: true }}>
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

Message1SettingsStep.displayName = 'Message1SettingsStep';
