import { useRouter } from 'next/router';

import { Redirect } from '@/components/common';

function CustonSegments() {
  const { asPath } = useRouter();

  return <Redirect href={`${asPath}/message-report`} method='replace' />;
}

export default CustonSegments;
