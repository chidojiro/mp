import { Redirect } from '@/components';
import React from 'react';
import URI from 'urijs';

const Reports = () => {
  const uri = new URI();

  return <Redirect href={uri.segment('line-email').href()} method='replace' />;
};

export default Reports;
