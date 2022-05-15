import classNames from 'classnames';
import React from 'react';
import { Children, ClassName } from '../types';
import { Item } from './Item';
import { Navigator } from './Navigator';
import style from './Stepper.module.css';
import { StepperContext } from './StepperContext';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = Children & ClassName & {};

// eslint-disable-next-line no-empty-pattern
export const Stepper = ({ children, className }: Props) => {
  const [completedSteps, setCompletedSteps] = React.useState<number[]>([-1]);
  const [stepRefs, setStepRefs] = React.useState<any>([]);
  const stepsCountRef = React.useRef(-1);

  const increaseStepsCount = React.useCallback(() => {
    stepsCountRef.current = stepsCountRef.current + 1;

    return stepsCountRef.current;
  }, []);

  const toggleCompletedStep = React.useCallback((step: number) => {
    setCompletedSteps(prev =>
      prev.includes(step) ? prev.filter(prevStep => prevStep !== step) : [...prev, step]
    );
  }, []);

  const value = React.useMemo(
    () => ({
      increaseStepsCount,
      stepsCount: stepsCountRef.current,
      completedSteps,
      toggleCompletedStep,
      stepRefs,
      setStepRefs,
    }),
    [completedSteps, increaseStepsCount, stepRefs, toggleCompletedStep]
  );

  return (
    <StepperContext.Provider value={value}>
      <div className={classNames('mp-stepper', className, style['mp-stepper'])}>{children}</div>
    </StepperContext.Provider>
  );
};

Stepper.Item = Item;
Stepper.Navigator = Navigator;
