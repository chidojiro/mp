import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { lorem } from '@/constants';

import { OverlayingLoader } from '.';

export default {
  title: 'Components/OverlayingLoader',
  component: OverlayingLoader,
} as ComponentMeta<typeof OverlayingLoader>;

const Template: ComponentStory<typeof OverlayingLoader> = args => (
  <OverlayingLoader
    {...args}
    component={<div className='flex items-center justify-center w-full h-full'>Loading...</div>}
  >
    <div className='w-[500px] h-[500px] bg-input opacity-50'>{lorem}</div>
  </OverlayingLoader>
);

export const Basic = Template.bind({});
Basic.args = {
  active: false,
};
