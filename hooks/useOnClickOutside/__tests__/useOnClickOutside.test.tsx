import React from 'react';

import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Mounter } from 'tests';

import { useOnClickOutside } from '..';

const mockListener = jest.fn();

const HookHost = () => {
  const ref = React.useRef<HTMLDivElement>(null);

  useOnClickOutside([ref], mockListener);

  return <div ref={ref} data-testid='test-trigger'></div>;
};

const UNMOUNT_AFTER = 1000;

const renderComponent = (unmountAfter?: number) => {
  return render(
    <Mounter unmountAfter={unmountAfter}>
      <HookHost />
    </Mounter>
  );
};

it('should call listener', () => {
  renderComponent();

  userEvent.click(document.querySelector('body')!);

  expect(mockListener).toBeCalled();
});

it('should not call listener', () => {
  renderComponent();

  userEvent.click(screen.getByTestId('test-trigger'));

  expect(mockListener).not.toBeCalled();
});

it('should unregister listener', () => {
  renderComponent(UNMOUNT_AFTER);

  act(() => {
    jest.advanceTimersByTime(UNMOUNT_AFTER);
  });

  userEvent.click(document.querySelector('body')!);

  expect(mockListener).not.toBeCalled();
});
