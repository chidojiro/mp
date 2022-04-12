import React, { useEffect, useState } from 'react';

import classNames from 'classnames';
import { useTranslation } from 'next-i18next';

import { Icon } from '@/components';
import { Button } from '@/components/common';
import { Step } from '@/constants';

type Props = {
  step: Step;
  isLastStep: boolean;
  isAlert: boolean;
  onConfirm: (stepId: number) => void;
  onShowPreview: (stepId: number) => void;
};

export const StepForm = React.forwardRef<HTMLDivElement, Props>(
  ({ step, isLastStep, isAlert, onConfirm, onShowPreview }, ref) => {
    const { t } = useTranslation('marketingAction');
    const { id, name, isDone, showPreviewBtn, children } = step;
    const [showAlert, setShowAlert] = useState(isAlert);

    useEffect(() => {
      setShowAlert(!isDone && isAlert);
    }, [isDone, isAlert]);

    const handleConfirm = (stepId: number) => {
      onConfirm(stepId);
      setShowAlert(false);
    };

    return (
      <div
        className={classNames('flex relative', {
          'before:ml-3.5 before:border before:h-full before:absolute': isLastStep,
          'before:border-mint-green': isDone,
        })}
      >
        <div
          className={classNames(
            'flex z-10 items-center justify-center mr-5 border-2 rounded-full w-[30px] h-7 border-mint-green',
            isDone ? 'bg-mint-green' : 'bg-gray'
          )}
        >
          <Icon name='check' className='w-[17px] h-[13px] text-white' />
        </div>
        <div className='flex flex-col w-full'>
          <div className='flex mb-5 cursor-pointer' ref={ref}>
            <h3 className='text-secondary mr-2.5'>STEP {id}</h3>
            <h3 className='text-gray-dark'>{name}</h3>
          </div>
          <div className='w-full px-10 py-8 mb-5 rounded-lg bg-gray-light'>{children}</div>
          <div className='flex justify-center mb-8 text-medium'>
            {showPreviewBtn && (
              <Button
                className='h-9 border-none bg-input-focus min-w-[240px] mr-2.5'
                variant='outline'
                onClick={() => onShowPreview?.(id)}
              >
                {t('viewPreview')}
              </Button>
            )}
            {isDone ? (
              <Button
                colorScheme='green'
                variant='outline'
                className='relative h-9 min-w-[240px] border-2 text-white'
              >
                <div>{t('confirm')}</div>
              </Button>
            ) : (
              <Button
                onClick={() => handleConfirm(id)}
                className='relative h-9 border-none bg-mint-green min-w-[240px]'
              >
                <div>{t('confirm')}</div>
                <div className={classNames('absolute', { hidden: !showAlert })}>
                  <div
                    className={classNames(
                      'shadow-[2px_4px_6px_0px_#00000029] w-[400px] px-[17px] py-[9px] relative rounded-full bg-primary bottom-16',
                      "before:content-[''] before:absolute before:bottom-[-14px] before:right-1/2 before:border-primary",
                      'before:w-6 before:h-[15px] before:shadow-[4px_4px_6px_0px_#00000029] before:border-r-[16px] before:border-b-[3px] before:rounded-br-[80px_50px]'
                    )}
                    onClick={e => e.stopPropagation()}
                  >
                    <Icon
                      onClick={() => setShowAlert(false)}
                      name='popover-close'
                      className='absolute right-[-2px] top-[-5px] w-[18px] rounded-full h-[18px]'
                    />
                    <div className='font-bold text-white text-regular'>{t('alertConfirm')}</div>
                  </div>
                </div>
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }
);

StepForm.displayName = 'StepForm';
