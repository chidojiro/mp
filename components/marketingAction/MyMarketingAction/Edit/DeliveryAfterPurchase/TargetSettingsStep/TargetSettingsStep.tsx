import { Stepper } from '@/components';
import { useTranslation } from 'next-i18next';
import { FormProvider, useForm } from 'react-hook-form';
import { StepActions } from '../../StepActions';
import { TargetSettingsSection } from '../../TargetSettingsSection';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

// eslint-disable-next-line no-empty-pattern
export const TargetSettingsStep = ({}: Props) => {
  const { t } = useTranslation('marketingAction');

  const methods = useForm({ defaultValues: { useLine: true } });
  const {
    handleSubmit,
    formState: { isSubmitSuccessful, isDirty },
    reset,
  } = methods;
  const onValidSubmit = (v: any) => {
    reset(v);
  };
  const onInvalidSubmit = () => {
    window.alert(t('pleaseFillInAllFields'));
  };
  const isComplete = isSubmitSuccessful && !isDirty;

  return (
    <Stepper.Item label={t('targetAndTimePeriodSetting')} complete={isComplete}>
      <FormProvider {...methods}>
        <TargetSettingsSection />
        <StepActions
          onConfirmClick={handleSubmit(onValidSubmit, onInvalidSubmit)}
          complete={isComplete}
        />
      </FormProvider>
    </Stepper.Item>
  );
};
