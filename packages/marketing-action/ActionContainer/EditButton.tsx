import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import useSWR from 'swr';
import { Button } from '@/common/Button';
import { useProfile } from '@/auth/useProfile';
import { MarketingActionApis } from '@/marketing-action/apis';
import { ActionsByAliasResponse } from '@/marketing-action/apis';

type Props = {
  typeName: string;
  alias?: string;
};
export const EditButton = ({ alias = '', typeName }: Props) => {
  const { t } = useTranslation('marketingAction');
  const profile = useProfile();
  const [editUrl, setEditUrl] = React.useState('');
  const { data } = useSWR<ActionsByAliasResponse | null, any>(['/actionByAlias', alias], () =>
    MarketingActionApis.getActionsByAlias(alias)
  );
  React.useEffect(() => {
    let url = `/organizations/${profile.data?.organization_id}/projects/${profile.data?.project_id}/actions/edit/${typeName}`;
    if (data) {
      const allActions = [...data?.running, ...data?.draft, ...data?.complete];
      if (allActions.length === 1) {
        url = `${url}/${allActions[0].id}`;
      }
    }
    setEditUrl(url);
  }, [profile, data]);
  return (
    <div>
      <Link passHref href={editUrl}>
        <Button className='w-[360px] h-[44px] !block mx-auto mt-6'>{t('useThisTemplate')}</Button>
      </Link>
    </div>
  );
};