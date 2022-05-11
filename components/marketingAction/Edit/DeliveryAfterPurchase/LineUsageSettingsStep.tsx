import { useTranslation } from 'next-i18next';
import { FormProvider, UseFormReturn } from 'react-hook-form';

import { Stepper } from '@/components/Stepper';

import { LineUsageSection } from '../LineUsageSection';
import { StepActions } from '../StepActions';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = { formMethods: UseFormReturn<any>; complete?: boolean };

// eslint-disable-next-line no-empty-pattern
export const LineUsageSettingsStep = ({ formMethods, complete }: Props) => {
  const { t } = useTranslation('marketingAction');

  const { handleSubmit, reset } = formMethods;
  const onValidSubmit = (v: any) => {
    reset(v);
  };
  const onInvalidSubmit = () => {
    window.alert(t('pleaseFillInAllFields'));
  };

  return (
    <Stepper.Item label={t('useLine')} complete={complete}>
      <FormProvider {...formMethods}>
        <LineUsageSection />
        <StepActions
          onConfirmClick={handleSubmit(onValidSubmit, onInvalidSubmit)}
          complete={complete}
        />
      </FormProvider>
    </Stepper.Item>
  );
};
