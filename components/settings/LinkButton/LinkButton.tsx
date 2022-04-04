import { Icon } from '@/components';
import { ClassName } from '@/types';
import classNames from 'classnames';
import { useTranslation } from 'next-i18next';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = ClassName & { onClick?: () => void };

// eslint-disable-next-line no-empty-pattern
export const LinkButton = ({ className, onClick }: Props) => {
  const { t } = useTranslation('settings');

  return (
    <div
      onClick={onClick}
      className={classNames(
        'w-fit bg-white py-2 px-2.5 flex items-center rounded border border-input',
        'select-none cursor-pointer',
        className
      )}
    >
      <Icon name='variable' className='w-4 h-3.5 mr-1' />
      <span className='text-medium text-gray-dark'>{t('link')}</span>
    </div>
  );
};
