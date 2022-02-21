import { Redirect } from '@/components';
import { useRouter } from 'next/router';
import React from 'react';

const Reports = () => {
  const { asPath } = useRouter();

  return <Redirect href={`${asPath}/line-email`} />;
};

export default Reports;
