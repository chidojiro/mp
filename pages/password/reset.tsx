import { GetServerSideProps, NextPage } from 'next';

import { AuthApi } from '@/apis';

export const getServerSideProps: GetServerSideProps = async ({ query: { token } }) => {
  // if there is no token, redirect to login page
  if (!token) {
    return {
      redirect: {
        destination: '/login',
      },
      props: {},
    };
  }

  // verify token
  const response = await AuthApi.verifyToken(token as string);
  if (!response) {
    return {
      redirect: {
        destination: '/login',
      },
      props: {},
    };
  }
  return {
    props: {},
  };
};
export const Reset: NextPage = () => {
  return <div>Test</div>;
};

export default Reset;
