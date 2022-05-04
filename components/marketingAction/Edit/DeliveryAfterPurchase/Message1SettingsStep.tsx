import React from 'react';
import { useTranslation } from 'next-i18next';
import { FormProvider, UseFormReturn } from 'react-hook-form';

import { Form } from '@/components/common';
import { RadioGroup } from '@/components/common/fields';
import { DeliveryDateTimeInput } from '@/components/marketingAction/DeliveryDateTimeInput';
import { MessageContentPreviewType } from '@/components/marketingAction/MessageContentPreview';
import { PreviewOverlay } from '@/components/marketingAction/PreviewOverlay';
import { Section } from '@/components/Section';
import { Stepper } from '@/components/Stepper';
import { useVariables, useVisibilityControl } from '@/hooks';
import { MentionData, Option, StepMessageTemplate } from '@/types';
import { MarketingActionAlias } from '@/types/marketingAction';

import { ColorSettingSection } from '../ColorSettingsSection';
import { LineMessageContentSection } from '../LineMessageContentSection';
import { MailMessageContentSection } from '../MailMessageContentSection';
import { StepActions } from '../StepActions';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = { formMethods: UseFormReturn<any>; enableLine?: boolean; complete?: boolean };

// eslint-disable-next-line no-empty-pattern
export const Message1SettingsStep = React.forwardRef(
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

    const { data: variables } = useVariables(MarketingActionAlias.AFTER_PURCHASE);
    const mentionOptions = variables.map(
      data =>
        ({
          label: data.name_display,
          value: data,
        } as Option<MentionData, string>)
    );

    return (
      <Stepper.Item label={t('step1Setting')} complete={complete} ref={ref}>
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
            mentionOptions={mentionOptions}
            onPreviewClick={handleMailPreviewClick}
          />
          {!!enableLine && (
            <LineMessageContentSection
              mentionOptions={mentionOptions}
              onPreviewClick={handleLinePreviewClick}
            />
          )}
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

Message1SettingsStep.displayName = 'Message1SettingsStep';
