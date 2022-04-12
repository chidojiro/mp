type Props = {
  stepName: string;
  children: React.ReactNode;
};

export const StepBlock = ({ stepName, children }: Props) => {
  return (
    <div className='p-10 pb-6 border-b-4 border-white'>
      <h5 className='text-gray-dark'>{stepName}</h5>
      {children}
    </div>
  );
};
