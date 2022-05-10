import React, { useEffect, useState } from 'react';

import { Step } from '@/constants';
import { StepMessage } from '@/types';

import { StepForm } from './StepForm';

type Props = {
  steps: Step[];
  onShowPreview: (message: StepMessage) => void;
};

export const Steppers = ({ steps, onShowPreview }: Props) => {
  const idLastStep = steps.length;
  const [currAlertId, setCurrAlertId] = useState(1);
  const [refs, setRefs] = useState<any>();

  useEffect(() => {
    const _refs = steps.reduce((acc: any, step: Step) => {
      acc[step.id] = React.createRef();
      return acc;
    }, {});

    setRefs(_refs);
  }, [steps]);

  const handleConfirm = (stepId: number) => {
    if (stepId !== idLastStep) {
      const el = refs[stepId + 1]?.current;
      window.scrollTo({
        behavior: 'smooth',
        top: el?.getBoundingClientRect().top + window.pageYOffset - 80,
      });
      setCurrAlertId(stepId + 1);
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
          ref={refs?.[step.id]}
          isAlert={currAlertId === step.id}
        />
      ))}
    </>
  );
};
