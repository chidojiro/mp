import { Icon } from '@/components';
import { Button } from '@/components/common';
import { Step } from '@/constants';
import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import React from 'react';

type Props = {
  step: Step;
  isLastStep: boolean;
  onConfirm: (stepId: number) => void;
};

export const StepForm = ({ step, isLastStep, onConfirm }: Props) => {
  const { t } = useTranslation('marketingAction');
  const { id, name, isDone, showPreviewBtn, children } = step;

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
      <div className='flex flex-col w-full '>
        <div className='flex mb-5'>
          <h3 className='text-secondary mr-2.5'>STEP {id}</h3>
          <h3 className='text-gray-dark'>{name}</h3>
        </div>
        <div className='w-full px-10 py-8 mb-5 rounded-lg bg-gray-light'>{children}</div>

        <div className='flex justify-center mb-8 text-medium'>
          {showPreviewBtn && (
            <Button
              className='h-9 border-none bg-input-focus min-w-[240px] mr-2.5'
              variant='outline'
            >
              {t('viewPreview')}
            </Button>
          )}
          {isDone ? (
            <Button colorScheme='green' variant='outline' className='h-9 min-w-[240px] border-2'>
              {t('confirm')}
            </Button>
          ) : (
            <Button
              onClick={() => onConfirm?.(id)}
              className='h-9 border-none bg-mint-green min-w-[240px]'
            >
              {t('confirm')}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
