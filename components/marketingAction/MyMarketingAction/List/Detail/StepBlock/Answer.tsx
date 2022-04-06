type Props = {
  name: string;
  children: React.ReactNode;
};

export const Answer = ({ name, children }: Props) => {
  return (
    <div className='text-medium'>
      <div className='my-2 font-bold text-secondary'>{name}</div>
      <div className='mb-4 text-gray-dark'>{children}</div>
    </div>
  );
};
