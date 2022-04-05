import { ReactNode } from 'react';

import { Sidebar } from '../../Sidebar';
import { Header } from '../Header';
import { MainContent } from '../MainContent';

type Props = {
  title: string;
  subTitle?: string;
  children?: ReactNode;
};

export const Layout = ({ title, subTitle, children }: Props) => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <div className='flex flex-1'>
        <Sidebar />
        <MainContent title={title} subTitle={subTitle}>
          {children}
        </MainContent>
      </div>
    </div>
  );
};
