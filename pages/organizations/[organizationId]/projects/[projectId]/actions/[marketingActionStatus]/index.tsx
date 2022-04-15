import { useRouter } from 'next/router';

import { Redirect } from '@/components/common';

function MyMarketingActionPage() {
  const { asPath } = useRouter();

  return <Redirect href={`${asPath}/${1}`} method='replace' />;
}

export default MyMarketingActionPage;
