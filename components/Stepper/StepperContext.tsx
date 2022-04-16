import React from 'react';

type ProviderValue = {
  stepsCount: number;
  increaseStepsCount: () => number;
  completedSteps: number[];
  toggleCompletedStep: (step: number) => void;
};
const defaultValue: ProviderValue = {
  stepsCount: 0,
  completedSteps: [],
  increaseStepsCount: () => 0,
  toggleCompletedStep: () => 0,
};
export const StepperContext = React.createContext<ProviderValue>(defaultValue);
