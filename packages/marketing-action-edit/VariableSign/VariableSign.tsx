import { useTranslation } from 'next-i18next';
import classNames from 'classnames';

import { Dropdown } from '@/common/Dropdown';
import { Icon } from '@/common/Icon';
import { Option } from '@/common/types';
import { ClassName } from '@/common/types';
import { useVisibilityControl } from '@/common/useVisibilityControl';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = ClassName & { defaultOptions?: Option[]; onSelect?: (option: Option) => void };

// eslint-disable-next-line no-empty-pattern
export const VariableSign = ({ className, defaultOptions, onSelect }: Props) => {
  const { t } = useTranslation('marketingAction');

  const options = defaultOptions || [
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

  const handleSelect = (selectedValue: string) => {
    onSelect?.(options.find(({ value }) => value === selectedValue)!);
  };

  return (
    <Dropdown
      control={popoverControl}
      options={options}
      onSelect={handleSelect}
      trigger={
        <div
          className={classNames(
            'w-fit bg-white py-2 px-2.5 flex items-center rounded border border-input',
            'select-none',
            className
          )}
        >
          <Icon name='variable' className='w-4 h-3.5 mr-1' />
          <span className='text-medium text-gray-dark'>{t('variable')}</span>
        </div>
      }
    />
  );
};
