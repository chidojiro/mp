import { useRouter } from 'next/router';

import { Redirect } from '@/common/Redirect';

function NewMarketingActions() {
  const { asPath } = useRouter();

  return <Redirect href={`${asPath}/cart-abandoned`} method='replace' />;
}

export default NewMarketingActions;
