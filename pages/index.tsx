import { Redirect } from '@/common/Redirect';

export const IndexPage = () => {
  return <Redirect href='/login' method='replace' />;
};

export default IndexPage;
