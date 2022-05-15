import { Form } from '@/common/Form';
import { Section } from '@/common/Section';
import { Stepper } from '@/common/Stepper';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { FormProvider, UseFormReturn } from 'react-hook-form';
import { StepActions } from '../StepActions';
import { TargetSettingsSection } from '../TargetSettingsSection';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = { formMethods: UseFormReturn<any>; complete?: boolean };

// eslint-disable-next-line no-empty-pattern
export const TargetSettingsStep = React.forwardRef(({ formMethods, complete }: Props, ref) => {
  const { t } = useTranslation('marketingAction');

  const { handleSubmit, reset } = formMethods;
  const onValidSubmit = (v: any) => {
    reset(v);
  };
  const onInvalidSubmit = () => {
    window.alert(t('pleaseFillInAllFields'));
  };

  return (
    <Stepper.Item label={t('targetAndTimePeriodSetting')} complete={complete} ref={ref}>
      <FormProvider {...formMethods}>
        <TargetSettingsSection />
        <Section>
          <Section.Title>{t('implementationPeriod')}</Section.Title>
          <Section.Content>
            <Form.DatePicker
              className='w-1/2'
              range
              name='implementation_period_temp'
              rules={{
                validate: {
                  required: v => !!v?.length,
                },
              }}
            ></Form.DatePicker>
          </Section.Content>
        </Section>
        <StepActions
          onConfirmClick={handleSubmit(onValidSubmit, onInvalidSubmit)}
          complete={complete}
        />
      </FormProvider>
    </Stepper.Item>
  );
});

TargetSettingsStep.displayName = 'TargetSettingsStep';
