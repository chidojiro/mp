import { useRouter } from 'next/router';

import { Redirect } from '@/components/common';
import { MarketingActionStatus } from '@/types';

function MarketingActions() {
  const { asPath } = useRouter();

  return <Redirect href={`${asPath}/${MarketingActionStatus.RUNNING}`} method='replace' />;
}

export default MarketingActions;
