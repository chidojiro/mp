import { Redirect } from '@/components';
import { MarketingActionStatus } from '@/types';
import { useRouter } from 'next/router';

function MarketingActions() {
  const { asPath } = useRouter();

  return <Redirect href={`${asPath}/${MarketingActionStatus.RUNNING}`} method='replace' />;
}

export default MarketingActions;
