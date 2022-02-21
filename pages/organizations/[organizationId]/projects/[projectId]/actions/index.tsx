import { Redirect } from '@/components';
import { HeaderTab } from '@/constants';
import { useRouter } from 'next/router';

function MarketingActions() {
  const { asPath } = useRouter();

  return <Redirect href={`${asPath}/${HeaderTab.Active}`} />;
}

export default MarketingActions;
