import { Redirect } from '@/components';
import { useRouter } from 'next/router';

function MyMarketingActionPage() {
  const { query, pathname } = useRouter();

  return <Redirect href={{ pathname: `${pathname}/${1}`, query: { ...query } }} />;
}

export default MyMarketingActionPage;
