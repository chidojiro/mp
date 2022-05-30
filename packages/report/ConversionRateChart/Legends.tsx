import React from 'react';

type Item = {
  color: string;
  title?: string;
  type?: 'BAR' | 'LINE';
};

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = { items: Item[] };

// eslint-disable-next-line no-empty-pattern
export const Legends = ({ items }: Props) => {
  return (
    <div className='flex items-center gap-8'>
      {items.map(({ color, title, type = 'BAR' }, idx) => {
        if (type === 'BAR') {
          return (
            <React.Fragment key={idx}>
              <div className='flex items-center gap-2'>
                <div className='w-3 h-3 rounded-sm' style={{ background: color }}></div>
                {title}
              </div>
            </React.Fragment>
          );
        }

        if (type === 'LINE') {
          return (
            <div className='flex items-center gap-2' key={idx}>
              <div className='w-3 h-0.5 rounded-sm' style={{ background: color }}></div>
              {title}
            </div>
          );
        }

        return null;
      })}
    </div>
  );
};
