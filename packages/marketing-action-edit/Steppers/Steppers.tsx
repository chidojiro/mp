import React, { useEffect, useState } from 'react';
import { StepForm } from './StepForm';
import { StepMessage } from '@/marketing-action/types';
import { Step } from '@/marketing-action/constants';
import { Icon } from '@/common/Icon';
import classNames from 'classnames';

type Props = {
  steps: Step[];
  onShowPreview: (message: StepMessage) => void;
};

export const Steppers = ({ steps, onShowPreview }: Props) => {
  const idLastStep = steps.length;
  const [refs, setRefs] = useState<any>();
  const [completedSteps, setCompletedSteps] = useState<any[]>([]);

  useEffect(() => {
    const _refs = steps.reduce((acc: any, step: Step) => {
      acc[step.id] = React.createRef();
      return acc;
    }, {});

    setRefs(_refs);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleConfirm = (stepId: number) => {
    if (stepId !== idLastStep) {
      goToStep(stepId + 1);
    }
  };

  const goToStep = (stepId: number) => {
    const el = refs[stepId]?.current;
    window.scrollTo({
      behavior: 'smooth',
      top: el?.getBoundingClientRect().top + window.pageYOffset - 80,
    });
  };

  const toggleCompletedStep = React.useCallback((id: number, completed: boolean) => {
    setCompletedSteps(prev => {
      const _id = prev.findIndex(step => step?.id === id);
      let _completedSteps: any[] = [];
      if (_id > -1) {
        _completedSteps = prev.map(step => (step.id === id ? { ...step, completed } : step));
      } else {
        _completedSteps = [...prev, { id, completed }];
      }
      return _completedSteps;
    });
  }, []);

  const isCompleted = (stepId: number) => {
    return completedSteps.filter(step => step.id === stepId && step.completed)?.length;
  };

  return (
    <>
      <div
        className={classNames(
          'shadow-[0px_0px_10px_0px_#0000004D] fixed z-10 right-0 top-[250px]',
          'bg-white',
          'py-4 px-2',
          'rounded-l border border-solid border-r-0 border-gray-500'
        )}
      >
        {completedSteps.map(step => (
          <div key={step.id}>
            <span className='font-semibold text-mint-green text-small'>STEP{step.id}</span>
            <div
              onClick={() => goToStep(step.id)}
              className={classNames(
                'flex cursor-pointer items-center justify-center rounded-full w-7 h-7',
                step.completed ? 'bg-mint-green border-mint-green' : 'bg-gray'
              )}
            >
              <Icon name='check' className='text-white' size={17} />
            </div>
          </div>
        ))}
      </div>

      {steps.map((step: Step, idx: number) => (
        <StepForm
          step={step}
          isLastStep={idx !== idLastStep - 1}
          key={step.id}
          onConfirm={handleConfirm}
          onShowPreview={onShowPreview}
          ref={refs?.[step.id]}
          isNextStep={!!isCompleted(step.id - 1)}
          toggleCompletedStep={toggleCompletedStep}
        />
      ))}
    </>
  );
};
