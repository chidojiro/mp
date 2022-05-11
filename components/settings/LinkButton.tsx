import { useTranslation } from 'next-i18next';
import classNames from 'classnames';
import { FormProvider, useForm } from 'react-hook-form';

import { Button, Form, Popover } from '@/components/common';
import { Checkbox, InsertLinkParams } from '@/components/common/fields';
import { Icon } from '@/components/common/Icon';
import { useVisibilityControl } from '@/hooks';
import { ClassName } from '@/types';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = ClassName & { onInsertConfirm: (params: InsertLinkParams) => void };

// eslint-disable-next-line no-empty-pattern
export const LinkButton = ({ className, onInsertConfirm }: Props) => {
  const { t } = useTranslation('settings');
  const { t: tCommon } = useTranslation();

  const methods = useForm({ defaultValues: { type: 'email' } });
  const { watch, handleSubmit, reset, register } = methods;

  const type = watch('type');

  const renderInput = () => {
    if (type === 'email')
      return (
        <Form.Input
          key='email'
          name='email'
          label={<span className='font-semibold'>{tCommon('emailAddress')}</span>}
          rules={{ required: true }}
        />
      );

    return (
      <Form.Input
        name='url'
        label={<span className='font-semibold'>URL</span>}
        rules={{ required: true }}
      />
    );
  };

  const popoverControl = useVisibilityControl();

  const onValidSubmit = ({ type, url, email, openInNewTab }: any) => {
    onInsertConfirm({
      href: type === 'email' ? `mailto:${email}` : url,
      text: type === 'email' ? email : url,
      target: openInNewTab ? '_blank' : undefined,
    });

    reset();
    popoverControl.close();
  };

  const handleSave = () => {
    handleSubmit(onValidSubmit)();
  };

  return (
    <Popover
      placement='right-start'
      control={popoverControl}
      trigger={
        <div
          className={classNames(
            'w-fit bg-white py-2 px-2.5 flex items-center rounded border border-input',
            'select-none cursor-pointer',
            className
          )}
        >
          <Icon name='variable' className='w-4 h-3.5 mr-1' />
          <span className='text-medium text-gray-dark'>{t('link')}</span>
        </div>
      }
    >
      <FormProvider {...methods}>
        <div className='rounded border border-solid border-gray-500 w-[600px] overflow-hidden'>
          <div className='px-5 py-2 flex justify-between text-white bg-secondary items-center'>
            <h5 className='font-semibold'>{t('link')}</h5>
            <Icon
              name='close'
              size={16}
              className='cursor-pointer'
              onClick={popoverControl.close}
            />
          </div>
          <div className='px-10 py-6 bg-white'>
            <Form.Select
              label={<span className='font-semibold'>{tCommon('type')}</span>}
              name='type'
              options={[
                { label: tCommon('emailAddress'), value: 'email' },
                { label: 'URL', value: 'url' },
              ]}
            />
            <div className='mt-5'></div>
            {renderInput()}
            {type === 'url' && (
              <Checkbox
                label={t('openInNewTab')}
                className='mt-2 text-medium'
                {...register<any>('openInNewTab')}
              />
            )}
            <div className='flex items-center justify-center gap-2 mt-7'>
              <Button onClick={popoverControl.close} colorScheme='negative'>
                {tCommon('cancel')}
              </Button>
              <Button onClick={handleSave} className='w-[240px]'>
                {tCommon('save')}
              </Button>
            </div>
          </div>
        </div>
      </FormProvider>
    </Popover>
  );
};
