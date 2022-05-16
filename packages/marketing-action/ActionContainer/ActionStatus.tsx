import { RefreshIcon } from '@heroicons/react/outline';
import { useTranslation } from 'next-i18next';
import useSWR from 'swr';
import { ActionsByAliasResponse, MarketingActionApis } from '../apis';
import { Badge } from './Badge';

type Props = {
  alias?: string;
};
export const ActionStatus = ({ alias = '' }: Props) => {
  const { t } = useTranslation();
  const { data } = useSWR<ActionsByAliasResponse | null, any>(['/actionByAlias', alias], () =>
    MarketingActionApis.getActionsByAlias(alias)
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
