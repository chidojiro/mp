import { Redirect } from '@/components';
import URI from 'urijs';

function NewMarketingActions() {
  const uri = new URI();

  return <Redirect href={uri.segment('cart-abandoned').href()} />;
}

export default NewMarketingActions;
