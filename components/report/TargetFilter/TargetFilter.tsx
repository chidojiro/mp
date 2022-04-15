import React from 'react';

import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

import { Option, TARGET } from '@/types';
import { CheckboxGroup } from '@/components';

import { CheckboxTag } from './CheckboxTag';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = {};

// eslint-disable-next-line no-empty-pattern
export const TargetFilter = ({}: Props) => {
  const { t } = useTranslation('report');

  const { query, push, pathname } = useRouter();

  const targetOptions = React.useMemo<Option[]>(
    () => [
      { label: t('f0member'), value: TARGET.F0_MEMBER },
      { label: t('f0others'), value: TARGET.F0_OTHERS },
      { label: t('F1'), value: TARGET.F1 },
      { label: t('F2'), value: TARGET.F2 },
      { label: t('semiLoyal'), value: TARGET.SEMI_LOYAL },
      { label: t('loyal'), value: TARGET.LOYAL },
      { label: t('f1dormant'), value: TARGET.F1_DORMANT },
      { label: t('loyalDormant'), value: TARGET.LOYAL_DORMANT },
      { label: t('otherDormant'), value: TARGET.OTHER_DORMANT },
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
