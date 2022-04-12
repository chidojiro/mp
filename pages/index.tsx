import { Redirect } from '@/components/common/Redirect';

export const IndexPage = () => {
  return <Redirect href='/login' method='replace' />;
};

export default IndexPage;
