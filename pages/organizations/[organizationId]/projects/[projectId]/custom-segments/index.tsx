import { Redirect } from '@/components';
import { useRouter } from 'next/router';

function CustonSegments() {
  const { asPath } = useRouter();

  return <Redirect href={`${asPath}/message-report`} method='replace' />;
}

export default CustonSegments;
