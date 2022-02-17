import { Redirect } from '@/components';
import { HeaderTab } from '@/constants';
import URI from 'urijs';

function MarketingActions() {
  const uri = new URI();

  return <Redirect href={uri.segment(HeaderTab.Active).href()} />;
}

export default MarketingActions;
