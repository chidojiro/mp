import React from 'react';
import { noop } from 'lodash-es';

type ProviderValue = {
  stepsCount: number;
  increaseStepsCount: () => number;
  completedSteps: number[];
  toggleCompletedStep: (step: number) => void;
  stepRefs: any[];
  setStepRefs: React.Dispatch<React.SetStateAction<any[]>>;
};
const defaultValue: ProviderValue = {
  stepsCount: 0,
  completedSteps: [],
  increaseStepsCount: () => 0,
  toggleCompletedStep: () => 0,
  stepRefs: [],
  setStepRefs: noop,
};
export const StepperContext = React.createContext<ProviderValue>(defaultValue);
