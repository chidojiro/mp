import { Sidebar } from '../Sidebar';
import { Header } from './Header';
import { LayoutProps } from './Layout.types';
import { MainContent } from './MainContent';

export const Layout = ({ title, subTitle, children }: LayoutProps) => {
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
