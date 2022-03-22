import React from 'react';
import { Option } from '@/types';
import { useTranslation } from 'next-i18next';
import { CheckboxGroup } from '@/components';
import { CheckboxTag } from './CheckboxTag';
import { useRouter } from 'next/router';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

// eslint-disable-next-line no-empty-pattern
export const TargetFilter = ({}: Props) => {
  const { t } = useTranslation('report');

  const { query, push, pathname } = useRouter();

  const targetOptions = React.useMemo<Option[]>(
    () => [
      { label: t('f0member'), value: 'f0member' },
      { label: t('f0others'), value: 'f0others' },
      { label: t('F1'), value: 'f1' },
      { label: t('F2'), value: 'f2' },
      { label: t('semiLoyal'), value: 'semiloyal' },
      { label: t('loyal'), value: 'loyal' },
      { label: t('f1dormant'), value: 'f1dormant' },
      { label: t('loyalDormant'), value: 'loyaldormant' },
    ],
    [t]
  );

  const allTargets = targetOptions.map(({ value }) => value);

  const selectedTargets = [query.targets].flat();

  const handleTargetChange = (value: string[]) => {
    push({ pathname, query: { ...query, targets: value } });
  };

  const handleAllTargetToggle: React.ChangeEventHandler<HTMLInputElement> = e => {
    if (e.target.checked) {
      push({ pathname, query: { ...query, targets: ['all'] } });
    } else {
      push({ pathname, query: { ...query, targets: [] } });
    }
  };

  return (
    <div className='flex items-center gap-8'>
      <div className='font-bold'>{t('target')}</div>
      <div className='flex items-center gap-2'>
        <CheckboxTag
          value='all'
          label={t('all')}
          checked={
            selectedTargets.includes('all') || selectedTargets.length === targetOptions.length
          }
          onChange={handleAllTargetToggle}
        />
        <CheckboxGroup
          value={
            selectedTargets.includes('all')
              ? allTargets
              : (selectedTargets.filter(Boolean) as string[])
          }
          onChange={handleTargetChange}
        >
          {targetOptions.map(({ value, label }) => (
            <CheckboxGroup.Option value={value} key={value}>
              {({ handleChange, isChecked, value }) => (
                <CheckboxTag
                  value={value}
                  label={label}
                  checked={isChecked}
                  onChange={handleChange}
                />
              )}
            </CheckboxGroup.Option>
          ))}
        </CheckboxGroup>
      </div>
    </div>
  );
};
