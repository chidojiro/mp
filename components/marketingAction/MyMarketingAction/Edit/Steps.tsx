import { Button, Form } from '@/components/common';
import { Icon } from '@/components';
import { Step } from '@/constants';
import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { useForm } from 'react-hook-form';

type Props = {
  className?: string;
  steps: Step[];
};

export const Steps = ({ className, steps }: Props) => {
  const { t } = useTranslation('marketingAction');
  const idLastStep = steps.length - 1;

  const methods = useForm();

  const onSubmit = (data: any) => {
    // handle change
    console.log('submit', data);
  };

  return (
    <Form methods={methods} onSubmit={onSubmit} className={className}>
      <button>aaa</button>
      {steps.map((step: Step, idx: number) => (
        <div
          key={idx}
          className={classNames('flex relative', {
            'before:ml-3.5 before:border before:h-full before:absolute': idx !== idLastStep,
            'before:border-primary': step.isDone,
          })}>
          <div
            className={classNames(
              'flex z-10 items-center justify-center mr-5 border-2 rounded-full w-[30px] h-7 border-primary',
              step.isDone ? 'bg-primary' : 'bg-gray'
            )}>
            <Icon name='check' className='w-[17px] h-[13px] text-primary' />
          </div>
          <div className='flex flex-col w-full '>
            <div className='flex mb-5'>
              <h3 className='text-secondary mr-2.5'>STEP {idx + 1}</h3>
              <h3 className='text-gray-dark'>{step.name}</h3>
            </div>
            <div className='w-full px-10 py-8 mb-5 rounded-lg bg-gray-light'>{step.children}</div>

            <div className='flex justify-end mb-8'>
              {step?.showPreviewBtn ? (
                <>
                  <Button className='font-semibold border-none bg-input min-w-[240px] mr-2.5' variant='outline'>
                    {t('viewPreview')}
                  </Button>
                  <Button className='font-semibold border-none bg-[#68CE97] min-w-[240px]' variant='outline'>
                    {t('confirm')}
                  </Button>
                </>
              ) : (
                <Button colorScheme='green' variant='outline' className='font-semibold min-w-[240px] border-2'>
                  {t('viewPreview')}
                </Button>
              )}
            </div>
          </div>
        </div>
      ))}
    </Form>
  );
};
