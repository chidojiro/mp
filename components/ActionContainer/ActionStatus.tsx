import useSWR from 'swr';
import { useTranslation } from 'next-i18next';
import { RefreshIcon } from '@heroicons/react/outline';

import { ActionsByAliasResponse, MarketingActionAPI } from '@/apis';

import { Badge } from './Badge';

type Props = {
  alias?: string;
};
export const ActionStatus = ({ alias = '' }: Props) => {
  const { t } = useTranslation();
  const { data } = useSWR<ActionsByAliasResponse | null, any>(['/actionByAlias', alias], () =>
    MarketingActionAPI.getActionsByAlias(alias)
  );
  const isRunning = !!data && data?.running && data?.running.length > 0;
  if (isRunning) {
    return (
      <div key={alias}>
        <Badge>
          <RefreshIcon width={16} height={16} />
          <span className='ml-2'>{t('inProgress')}</span>
        </Badge>
      </div>
    );
  } else {
    return null;
  }
};
