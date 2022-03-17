import { Redirect } from '@/components';

export const IndexPage = () => {
  return <Redirect href='/login' method='replace' />;
};

export default IndexPage;
