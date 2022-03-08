import { Redirect } from '@/components';

export const IndexPage = () => {
  return <Redirect href='/organizations/1/dashboard' method='replace' />;
};

export default IndexPage;
