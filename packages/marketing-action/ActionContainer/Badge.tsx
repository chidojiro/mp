import { Children } from '@/common/types';

type BadgeProps = Children;
export const Badge = ({ children }: BadgeProps) => {
  return (
    <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xxs text-white bg-secondary text-gray-800'>
      {children}
    </span>
  );
};
