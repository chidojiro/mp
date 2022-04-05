import React from 'react';

import { useRouter } from 'next/router';

import { Edit } from './Edit';
import { List } from './List';

export const MyMarketingAction = () => {
  const {
    query: { marketingActionStatus },
  } = useRouter();

  return marketingActionStatus ? <List /> : <Edit />;
};
