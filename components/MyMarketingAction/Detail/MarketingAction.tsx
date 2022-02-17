type Props = {
  children?: React.ReactNode;
};

export const MarketingAction = ({ children }: Props) => {
  return <div className='h-full p-10 border rounded-lg border-gray'>{children}</div>;
};
