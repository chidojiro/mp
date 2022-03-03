import React from 'react';
import { ComponentStory } from '@storybook/react';

import { useOverlay } from '.';

export default {
  title: 'Hooks/useOverlay',
};

const Template: ComponentStory<any> = ({ active, hostWidth, hostHeight }: any) => {
  const ref = React.useRef<HTMLDivElement>(null);

  useOverlay({
    active,
    host: ref,
    component: <div className='flex items-center justify-center w-full h-full'>Loading...</div>,
  });

  return (
    <div className='bg-input' style={{ width: hostWidth, height: hostHeight }} ref={ref}></div>
  );
};

export const Basic = Template.bind({});
Basic.args = {
  active: false,
  hostWidth: '80vw',
  hostHeight: '80vh',
};
