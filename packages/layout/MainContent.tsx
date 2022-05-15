import classNames from 'classnames';
import { MainContentProps } from './types';

export const MainContent = ({ title, subTitle, children }: MainContentProps) => {
  return (
    <div className={classNames('relative flex flex-col flex-1 p-10', 'ml-[12px] mt-12')}>
      <div className='flex mb-10'>
        <h1 className='text-gray-800 font-bold'>{title}</h1>
        {!!subTitle && <h3 className='flex items-center ml-5 text-gray-600'>{subTitle}</h3>}
      </div>
      <div className='flex-1'>{children}</div>
    </div>
  );
};
