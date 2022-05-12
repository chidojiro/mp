import React from 'react';
import classNames from 'classnames';

import { Icon } from '@/components/common';
import { StepperContext } from '@/components/Stepper/StepperContext';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

// eslint-disable-next-line no-empty-pattern
export const Navigator = ({}: Props) => {
  const { completedSteps, stepsCount, stepRefs } = React.useContext(StepperContext);

  return (
    <div
      style={{ boxShadow: `0px 0px 10px #0000004D;` }}
      className={classNames(
        'fixed right-0 top-[250px]',
        'bg-white',
        'py-4 px-2',
        'rounded-l border border-solid border-gray-500'
      )}
    >
      <div className='flex flex-col gap-1'>
        {new Array(stepsCount + 1).fill(null).map((_, idx) => (
          <div key={idx}>
            <span className='text-mint-green text-small font-semibold'>STEP{idx + 1}</span>
            <div
              onClick={() => {
                window.scrollTo({
                  behavior: 'smooth',
                  top: stepRefs[idx].current!.getBoundingClientRect().top + window.pageYOffset - 80,
                });
              }}
              className={classNames(
                'flex items-center justify-center rounded-full w-7 h-7 cursor-pointer',
                completedSteps.includes(idx) ? 'bg-mint-green border-mint-green' : 'bg-gray'
              )}
            >
              <Icon name='check' className='text-white' size={17} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
