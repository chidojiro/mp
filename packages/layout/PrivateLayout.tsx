import { Header } from './Header';
import { MainContent } from './MainContent';
import { Sidebar } from './Sidebar';
import { LayoutProps } from './types';

export const PrivateLayout = ({ title, subTitle, children }: LayoutProps) => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <div className='flex flex-1 mt-[48px]'>
        <div className='flex-1 flex'>
          <aside className='h-screen sticky top-0'>
            <Sidebar />
          </aside>

          <main className='flex justify-center w-full'>
            <MainContent title={title} subTitle={subTitle}>
              {children}
            </MainContent>
          </main>
        </div>
      </div>
    </div>
  );
};
