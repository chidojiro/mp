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
      { label: t('all'), value: 'all' },
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

  const handleTargetChange = (value: string[]) => {
    push({ pathname, query: { ...query, targets: value } });
  };

  return (
    <div className='flex items-center gap-8'>
      <div className='font-bold'>{t('target')}</div>
      <div className='flex items-center gap-2'>
        <CheckboxGroup
          value={[query.targets].flat().filter(Boolean) as string[]}
          onChange={handleTargetChange}>
          {targetOptions.map(({ value, label }) => (
            <CheckboxTag value={value} label={label} key={value} />
          ))}
        </CheckboxGroup>
      </div>
    </div>
  );
};
