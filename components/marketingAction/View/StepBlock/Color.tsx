type Props = {
  color: string;
  label: string;
};

export const Color = ({ color, label }: Props) => {
  return (
    <label className={'flex items-center mb-2.5 cursor-pointer'}>
      <div className='w-[34px] h-[34px] p-1 rounded flex items-center border bg-white border-input'>
        <div className='w-full h-full rounded' style={{ backgroundColor: color }}></div>
      </div>
      <span className='ml-2.5 text-medium text-gray-dark'>{label}</span>
    </label>
  );
};
