import { ClassName } from '@/types';
import classNames from 'classnames';
import { useTranslation } from 'next-i18next';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = ClassName & {};

// eslint-disable-next-line no-empty-pattern
export const UpdateInformation = ({ className }: Props) => {
  const { t } = useTranslation(['marketingAction', 'common']);

  return (
    <div
      className={classNames(
        'rounded-lg border-2 border-solid border-primary',
        'p-8 mb-14',
        className
      )}
    >
      <h5 className='mb-4 text-primary'>{t('updateInformation')}</h5>
      <div className='space-y-3 text-gray-800'>
        <div className='flex items-center'>
          <div className='w-1.5 h-1.5 bg-primary rounded-full mr-2'></div>
          <div className='mr-5'>12/10 ({t('fri')})</div>
          <div>{t('changedInTheDropDownBasketNotification', { placeholder: '...' })}</div>
        </div>

        <div className='flex items-center'>
          <div className='w-1.5 h-1.5 bg-primary rounded-full mr-2'></div>
          <div className='mr-5'>12/10 ({t('fri')})</div>
          <div>{t('changedForStepDeliveryAfterPurchase', { placeholder: '...' })}</div>
        </div>

        <div className='flex items-center'>
          <div className='w-1.5 h-1.5 bg-primary rounded-full mr-2'></div>
          <div className='mr-5'>12/10 ({t('fri')})</div>
          <div>{t('changedInDropDownListNotification', { placeholder: '...' })}</div>
        </div>
      </div>
    </div>
  );
};
