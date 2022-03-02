import { Icon } from '@/components';
import { Button } from '@/components/common';
import { Step } from '@/constants';
import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import React from 'react';

type Props = {
  steps: Step[];
};

export const Steps = ({ steps }: Props) => {
  const { t } = useTranslation('marketingAction');
  const idLastStep = steps.length - 1;

  return (
    <>
      {steps.map((step: Step, idx: number) => (
        <div
          key={idx}
          className={classNames('flex relative', {
            'before:ml-3.5 before:border before:h-full before:absolute': idx !== idLastStep,
            'before:border-mint-green': step.isDone,
          })}
        >
          <div
            className={classNames(
              'flex z-10 items-center justify-center mr-5 border-2 rounded-full w-[30px] h-7 border-mint-green',
              step.isDone ? 'bg-mint-green' : 'bg-gray'
            )}
          >
            <Icon name='check' className='w-[17px] h-[13px] text-white' />
          </div>
          <div className='flex flex-col w-full '>
            <div className='flex mb-5'>
              <h3 className='text-secondary mr-2.5'>STEP {idx + 1}</h3>
              <h3 className='text-gray-dark'>{step.name}</h3>
            </div>
            <div className='w-full px-10 py-8 mb-5 rounded-lg bg-gray-light'>{step.children}</div>

            <div className='flex justify-center mb-8'>
              {step?.showPreviewBtn ? (
                <>
                  <Button
                    className='font-semibold border-none bg-input-focus min-w-[240px] mr-2.5'
                    variant='outline'
                  >
                    {t('viewPreview')}
                  </Button>
                  <Button
                    className='font-semibold border-none bg-mint-green min-w-[240px]'
                    variant='outline'
                  >
                    {t('confirm')}
                  </Button>
                </>
              ) : (
                <Button
                  colorScheme='green'
                  variant='outline'
                  className='font-semibold min-w-[240px] border-2'
                >
                  {t('viewPreview')}
                </Button>
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
