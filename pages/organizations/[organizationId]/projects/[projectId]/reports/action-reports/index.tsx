import React from 'react';

import { useRouter } from 'next/router';

import { Redirect } from '@/components';

const Reports = () => {
  const { asPath } = useRouter();

  return <Redirect href={`${asPath}/line-email`} method='replace' />;
};

export default Reports;
