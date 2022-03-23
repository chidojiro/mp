import { Icon } from '@/components';
import { Popover } from '@/components/common';
import { useVisibilityControl } from '@/hooks';
import { ClassName, Option } from '@/types';
import classNames from 'classnames';
import { useTranslation } from 'next-i18next';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = ClassName & { onSelect?: (option: Option) => void };

// eslint-disable-next-line no-empty-pattern
export const VariableSign = ({ className, onSelect }: Props) => {
  const { t } = useTranslation('marketingAction');

  const options = [
    { label: t('customerName'), value: 'customerName' },
    { label: t('brandName'), value: 'brandName' },
    { label: t('businessHours'), value: 'businessHours' },
    { label: t('emailAddressForInquiries'), value: 'emailAddressForInquiries' },
    { label: t('telephoneNumberForInquiry'), value: 'telephoneNumberForInquiry' },
    { label: t('topPageUrl'), value: 'topPageUrl' },
    { label: t('thanksPageUrl'), value: 'thanksPageUrl' },
    { label: t('cartPageUrl'), value: 'cartPageUrl' },
    { label: t('productDetailPageUrl'), value: 'productDetailPageUrl' },
    { label: t('categoryPageUrl'), value: 'categoryPageUrl' },
  ];

  const popoverControl = useVisibilityControl();

  const handleSelect = (option: Option) => {
    onSelect?.(option);
    popoverControl.close();
  };

  return (
    <Popover
      control={popoverControl}
      trigger={
        <div className={classNames('py-2 px-2.5', 'select-none', className)}>
          <span className='text-medium text-gray-dark'>{t('variableText')}</span>
        </div>
      }
    >
      <div className='bg-white border border-solid rounded border-input'>
        {options.map(option => (
          <div
            onClick={e => {
              e.preventDefault();
              handleSelect(option);
            }}
            key={option.value}
            className='px-2 py-1 border-b border-solid cursor-pointer select-none border-input last:border-0 hover:bg-secondary hover:text-white text-medium'
          >
            {option.label}
          </div>
        ))}
      </div>
    </Popover>
  );
};
