import { useTranslation } from 'next-i18next';
import { FormProvider, UseFormReturn } from 'react-hook-form';

import { Stepper } from '@/common/Stepper';

import { LineUsageSection } from '../LineUsageSection';
import { StepActions } from '../StepActions';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {
  formMethods: UseFormReturn<any>;
  confirmed?: boolean;
  onConfirmationChange: (isConfirmed: boolean) => void;
};

// eslint-disable-next-line no-empty-pattern
export const LineUsageSettingsStep = ({ formMethods, confirmed, onConfirmationChange }: Props) => {
  const { t } = useTranslation('marketingAction');

  const { handleSubmit, reset } = formMethods;
  const onValidSubmit = (v: any) => {
    onConfirmationChange(true);
    reset(v);
  };
  const onInvalidSubmit = () => {
    window.alert(t('pleaseFillInAllFields'));
  };

  return (
    <Stepper.Item label={t('useLine')} complete={confirmed}>
      <FormProvider {...formMethods}>
        <LineUsageSection />
        <StepActions
          onConfirmClick={
            confirmed
              ? () => onConfirmationChange(false)
              : handleSubmit(onValidSubmit, onInvalidSubmit)
          }
          complete={confirmed}
          useTooltip
        />
      </FormProvider>
    </Stepper.Item>
  );
};
