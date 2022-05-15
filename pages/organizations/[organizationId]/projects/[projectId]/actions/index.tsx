import { useRouter } from 'next/router';

import { Redirect } from '@/common/Redirect';
import { MarketingActionStatus } from '@/marketing-action/types';

function MarketingActions() {
  const { asPath } = useRouter();

  return <Redirect href={`${asPath}/${MarketingActionStatus.RUNNING}`} method='replace' />;
}

export default MarketingActions;
