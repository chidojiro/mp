import { Redirect } from '@/components';
import { useRouter } from 'next/router';

function MyMarketingActionPage() {
  const { asPath } = useRouter();

  return <Redirect href={`${asPath}/${1}`} method='replace' />;
}

export default MyMarketingActionPage;
