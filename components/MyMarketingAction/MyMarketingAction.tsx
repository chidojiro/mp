import { useRouter } from 'next/router';
import React from 'react';
import { Edit } from './Edit';
import { List } from './List';

export const MyMarketingAction = () => {
  const {
    query: { marketingActionStatus },
  } = useRouter();

  return marketingActionStatus ? <List /> : <Edit />;
};
