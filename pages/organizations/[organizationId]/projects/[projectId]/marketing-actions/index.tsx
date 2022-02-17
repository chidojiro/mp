import { Redirect } from '@/components';
import URI from 'urijs';

function MarketingActions() {
  const uri = new URI();

  return <Redirect href={uri.segment('in-progress').href()} />;
}

export default MarketingActions;
