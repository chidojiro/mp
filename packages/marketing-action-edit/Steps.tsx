import React, { useState } from 'react';
import { StepForm } from './StepForm';
import { Step } from '@/marketing-action/constants';

type Props = {
  steps: Step[];
  onConfirm: (stepId: number) => void;
  onShowPreview: (stepId: number) => void;
};

export const Steps = ({ steps, onConfirm, onShowPreview }: Props) => {
  const idLastStep = steps.length;
  const [currAlertId, setCurrAlertId] = useState(1);

  const refs = steps.reduce((acc: any, step: Step) => {
    acc[step.id] = React.createRef();
    return acc;
  }, {});

  const handleConfirm = (stepId: number) => {
    onConfirm(stepId);
    if (stepId !== idLastStep) {
      setCurrAlertId(stepId + 1);
      const el = refs[stepId + 1]?.current;
      window.scrollTo({
        behavior: 'smooth',
        top: el.getBoundingClientRect().top + window.pageYOffset - 80,
      });
    }
  };

  return (
    <>
      {steps.map((step: Step, idx: number) => (
        <StepForm
          step={step}
          isLastStep={idx !== idLastStep - 1}
          key={step.id}
          onConfirm={handleConfirm}
          onShowPreview={onShowPreview}
          ref={refs[step.id]}
          isAlert={currAlertId === step.id}
        />
      ))}
    </>
  );
};
