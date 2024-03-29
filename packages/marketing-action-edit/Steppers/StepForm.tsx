import React, { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import classNames from 'classnames';
import { FormProvider } from 'react-hook-form';

import { Button } from '@/common/Button';
import { Icon } from '@/common/Icon';
import { StepMessage } from '@/marketing-action/types';
import { Step } from '@/marketing-action/constants';
import { ConfirmButton } from '@/marketing-action-edit/ConfirmButton';

type Props = {
  step: Step;
  isLastStep: boolean;
  isNextStep?: boolean;
  confirmed?: boolean;
  onShowPreview: (message: StepMessage) => void;
  onConfirm: (stepId: number) => void;
  onConfirmChanged?: (index: number, confirmed: boolean) => void;
};

export const StepForm = React.forwardRef<HTMLDivElement, Props>(
  (
    { step, isLastStep, isNextStep, confirmed = false, onShowPreview, onConfirm, onConfirmChanged },
    ref
  ) => {
    const { t } = useTranslation('marketingAction');
    const { id, name, showPreviewBtn, children, methods } = step;
    const [showAlert, setShowAlert] = useState(id === 1);

    const {
      handleSubmit,
      formState: { isDirty },
      reset,
    } = methods;

    const onInvalidSubmit = () => {
      window.alert(t('pleaseFillInAllFields'));
    };

    useEffect(() => {
      isDirty && onConfirmChanged?.(id - 1, false);
    }, [isDirty]);

    const onValidSubmit = (data: any) => {
      id === 1 && setShowAlert(false);
      onConfirmChanged?.(id - 1, true);
      onConfirm(id);
      reset(data);
    };

    const btnConfirm = () => {
      return (
        <div className='flex items-center'>
          <div
            className={classNames(
              'flex items-center justify-center w-5 h-5 mr-2 rounded-full',
              confirmed ? ' bg-white' : 'bg-gray'
            )}
          >
            <Icon
              name='check'
              className={classNames(
                'w-[10px] h-[8px]',
                confirmed ? 'text-mint-green' : 'text-white'
              )}
            />
          </div>
          {t('confirm')}
        </div>
      );
    };

    const showGreenBorder = id === 1 || confirmed || isNextStep;

    return (
      <FormProvider {...methods}>
        <div
          ref={ref}
          className={classNames('flex relative', {
            'before:ml-3.5 before:border before:h-full before:absolute': isLastStep,
            'before:border-mint-green': confirmed,
          })}
        >
          <div
            className={classNames(
              'flex z-10 items-center justify-center mr-5 border-2 rounded-full w-[30px] h-7',
              confirmed ? 'bg-mint-green border-mint-green' : 'bg-gray',
              showGreenBorder ? 'border-mint-green' : 'border-gray'
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
                  onClick={() => onShowPreview?.(methods.getValues())}
                >
                  {t('viewPreview')}
                </Button>
              )}
              {confirmed ? (
                <Button
                  onClick={() => onConfirmChanged?.(id - 1, false)}
                  className='relative h-9 min-w-[240px] border-none bg-mint-green'
                >
                  {btnConfirm()}
                </Button>
              ) : (
                <ConfirmButton
                  tooltipContent={showAlert ? t('alertConfirm') : undefined}
                  className='w-[240px]'
                  onClick={handleSubmit(onValidSubmit, onInvalidSubmit)}
                  colorScheme='green'
                  variant={confirmed ? 'solid' : 'outline'}
                >
                  <div
                    className={classNames(
                      'flex items-center justify-center w-5 h-5 mr-2 rounded-full',
                      confirmed ? 'bg-white' : 'bg-gray'
                    )}
                  >
                    <Icon
                      name='check'
                      size={10}
                      className={classNames(confirmed ? 'text-mint-green' : 'text-white')}
                    />
                  </div>
                  {t('confirm')}
                </ConfirmButton>
              )}
            </div>
          </div>
        </div>
      </FormProvider>
    );
  }
);

StepForm.displayName = 'StepForm';
