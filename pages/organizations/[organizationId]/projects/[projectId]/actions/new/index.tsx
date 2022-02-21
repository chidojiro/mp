import { Redirect } from '@/components';
import { useRouter } from 'next/router';

function NewMarketingActions() {
  const { asPath } = useRouter();

  return <Redirect href={`${asPath}/cart-abandoned`} />;
}

export default NewMarketingActions;
