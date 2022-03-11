import { Icon } from '@/components';
import { ClassName } from '@/types';
import classNames from 'classnames';
import { useTranslation } from 'next-i18next';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = ClassName & {};

// eslint-disable-next-line no-empty-pattern
export const VariableSign = ({ className }: Props) => {
  const { t } = useTranslation('marketingAction');

  return (
    <div
      className={classNames(
        'w-20 bg-white py-2 px-2.5 flex items-center rounded border border-input',
        className
      )}
    >
      <Icon name='variable' className='w-4 h-3.5 mr-1' />
      <span className='text-medium text-gray-dark'>{t('variable')}</span>
    </div>
  );
};
