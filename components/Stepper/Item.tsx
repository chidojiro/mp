import React from 'react';
import classNames from 'classnames';

import { Icon } from '@/components/common';
import { Children } from '@/types';

import { StepperContext } from './StepperContext';

type Props = Children & { label: React.ReactNode; complete?: boolean };

export const Item = React.forwardRef<any, Props>(
  ({ label, children, complete = false }: Props, ref: any) => {
    const [index, setIndex] = React.useState(0);
    const { increaseStepsCount, toggleCompletedStep, completedSteps } =
      React.useContext(StepperContext);

    React.useEffect(() => {
      const index = increaseStepsCount();
      setIndex(index);
    }, [increaseStepsCount]);

    React.useEffect(() => {
      toggleCompletedStep(index);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [toggleCompletedStep, complete]);

    const isActive = completedSteps.includes(index - 1);

    return (
      <div className='mp-stepper-item' ref={ref}>
        <div className={classNames('relative', 'flex items-center')}>
          <div
            className={classNames(
              'absolute left-0 transform -translate-x-1/2',
              'flex z-10 items-center justify-center mr-5 border-2 rounded-full w-7 h-7',
              complete ? 'bg-mint-green border-mint-green' : 'bg-gray',
              isActive ? 'border-mint-green' : 'border-gray'
            )}
          >
            <Icon name='check' className='text-white' size={17} />
          </div>
          <div className={classNames('pl-8', 'flex items-center gap-2')}>
            <h4 className='text-secondary'>STEP{index + 1}</h4>
            <h4>{label}</h4>
          </div>
        </div>
        <div
          className={classNames(
            'mp-stepper-item--content',
            'py-5 pl-8',
            'border-l-2 border-solid',
            complete ? 'border-mint-green' : 'border-gray'
          )}
        >
          {children}
        </div>
      </div>
    );
  }
);

Item.displayName = 'Item';
