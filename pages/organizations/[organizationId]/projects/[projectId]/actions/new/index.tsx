import { useRouter } from 'next/router';

import { Redirect } from '@/components/common';

function NewMarketingActions() {
  const { asPath } = useRouter();

  return <Redirect href={`${asPath}/cart-abandoned`} method='replace' />;
}

export default NewMarketingActions;
