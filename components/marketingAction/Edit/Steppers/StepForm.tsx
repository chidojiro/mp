import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';
import { FormProvider } from 'react-hook-form';

import { Button, Icon } from '@/components/common';
import { Step } from '@/constants';

import styles from './StepForm.module.css';

type Props = {
  step: Step;
  isLastStep: boolean;
  isAlert: boolean;
  onShowPreview: (stepId: number) => void;
  onConfirm: (stepId: number) => void;
};

export const StepForm = React.forwardRef<HTMLDivElement, Props>(
  ({ step, isLastStep, isAlert, onShowPreview, onConfirm }, ref) => {
    const { t } = useTranslation('marketingAction');
    const { id, name, showPreviewBtn, children, methods } = step;
    const [showAlert, setShowAlert] = useState(true);
    const [classAlert, setClassAlert] = useState('');

    const btnRef = useRef<any>(null);

    const {
      handleSubmit,
      formState: { isSubmitSuccessful, isDirty },
      reset,
    } = methods;

    useEffect(() => {
      setShowAlert(isAlert);
    }, [isAlert]);

    const onInvalidSubmit = () => {
      window.alert(t('pleaseFillInAllFields'));
    };
    const isComplete = isSubmitSuccessful && !isDirty;

    const onValidSubmit = (data: any) => {
      onConfirm(id);
      reset(data);
    };

    const btnConfirm = () => {
      return (
        <div className='flex items-center'>
          <div
            className={classNames(
              'flex items-center justify-center w-5 h-5 mr-2 rounded-full',
              isComplete ? 'bg-gray' : ' bg-white'
            )}
          >
            <Icon
              name='check'
              className={classNames(
                'w-[10px] h-[8px]',
                isComplete ? 'text-white' : 'text-mint-green'
              )}
            />
          </div>
          {t('confirm')}
        </div>
      );
    };

    useEffect(() => {
      window.addEventListener('scroll', scrollHandler);

      return () => window.removeEventListener('scroll', scrollHandler);
    }, []);

    const scrollHandler = () => {
      if (!classAlert && id === 1 && btnRef.current) {
        const { top, bottom } = btnRef.current.getBoundingClientRect();
        const vHeight = window.innerHeight || document.documentElement.clientHeight;
        if ((top > 0 || bottom > 0) && top < vHeight) {
          setClassAlert(styles['alert-show']);
        }
      }
    };

    const hidden = !showAlert || id !== 1;

    return (
      <FormProvider {...methods}>
        <div
          ref={ref}
          className={classNames('flex relative', {
            'before:ml-3.5 before:border before:h-full before:absolute': isLastStep,
            'before:border-mint-green': isComplete,
          })}
        >
          <div
            className={classNames(
              'flex z-10 items-center justify-center mr-5 border-2 rounded-full w-[30px] h-7',
              isComplete ? 'bg-mint-green border-mint-green' : 'bg-gray',
              id == 1 || showAlert ? 'border-mint-green' : 'border-gray'
            )}
          >
            <Icon name='check' className='w-[17px] h-[13px] text-white' />
          </div>
          <div className='flex flex-col w-full'>
            <div className='flex mb-5 cursor-pointer'>
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
              {isComplete ? (
                <Button
                  colorScheme='green'
                  variant='outline'
                  className='relative h-9 min-w-[240px] border-2 text-white'
                >
                  {btnConfirm()}
                </Button>
              ) : (
                <Button
                  ref={btnRef}
                  onClick={handleSubmit(onValidSubmit, onInvalidSubmit)}
                  className='relative h-9 border-none bg-mint-green min-w-[240px] ease-in duration-300'
                >
                  {btnConfirm()}
                  <div
                    className={classNames('absolute', classAlert, {
                      hidden: hidden,
                    })}
                  >
                    <div
                      className={classNames(
                        'ease-in duration-300 shadow-[2px_4px_6px_0px_#00000029] w-[400px] px-[17px] py-[9px] relative rounded-full bg-primary bottom-16',
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
      </FormProvider>
    );
  }
);

StepForm.displayName = 'StepForm';
