import { Stepper } from '@/components';
import { useTranslation } from 'next-i18next';
import { FormProvider, useForm } from 'react-hook-form';
import { LineUsageSection } from '../../LineUsageSection';
import { StepActions } from '../../StepActions';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

// eslint-disable-next-line no-empty-pattern
export const LineUsageSettingsStep = ({}: Props) => {
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
    <Stepper.Item label={t('useLine')} complete={isComplete}>
      <FormProvider {...methods}>
        <LineUsageSection />
        <StepActions
          onConfirmClick={handleSubmit(onValidSubmit, onInvalidSubmit)}
          complete={isComplete}
        />
      </FormProvider>
    </Stepper.Item>
  );
};
