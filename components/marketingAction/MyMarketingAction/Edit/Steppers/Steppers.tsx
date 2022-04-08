import { Step } from '@/constants';
import React, { useState } from 'react';
import { StepForm } from './StepForm';

type Props = {
  steps: Step[];
  onShowPreview: (stepId: number) => void;
};

export const Steppers = ({ steps, onShowPreview }: Props) => {
  const idLastStep = steps.length;
  const [currAlertId, setCurrAlertId] = useState(1);

  const refs = steps.reduce((acc: any, step: Step) => {
    acc[step.id] = React.createRef();
    return acc;
  }, {});

  return (
    <>
      {steps.map((step: Step, idx: number) => (
        <StepForm
          step={step}
          isLastStep={idx !== idLastStep - 1}
          key={step.id}
          onShowPreview={onShowPreview}
          ref={refs[step.id]}
          isAlert={currAlertId === step.id}
        />
      ))}
    </>
  );
};
