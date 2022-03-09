import { Step } from '@/constants';
import React from 'react';
import { StepForm } from './StepForm';

type Props = {
  steps: Step[];
  onConfirm: (stepId: number) => void;
  onShowPreview: (stepId: number) => void;
};

export const Steps = ({ steps, onConfirm, onShowPreview }: Props) => {
  const idLastStep = steps.length - 1;

  return (
    <>
      {steps.map((step: Step, idx: number) => (
        <StepForm
          step={step}
          isLastStep={idx !== idLastStep}
          key={step.id}
          onConfirm={onConfirm}
          onShowPreview={onShowPreview}
        />
      ))}
    </>
  );
};
