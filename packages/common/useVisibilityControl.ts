import React from 'react';

import { Fn } from './types';

export type VisibilityControl = {
  open: () => void;
  close: () => void;
  toggle: () => void;
  visible: boolean;
};

type Props = {
  defaultVisible?: boolean;
  onOpen?: Fn;
  onClose?: Fn;
};

export const useVisibilityControl = (props?: Props) => {
  const { defaultVisible, onOpen, onClose } = props ?? {};
  const [visible, setVisible] = React.useState(!!defaultVisible);

  const open = React.useCallback(() => {
    setVisible(true);
    onOpen?.();
  }, [onOpen]);

  const close = React.useCallback(() => {
    setVisible(false);
    onClose?.();
  }, [onClose]);

  const toggle = React.useCallback(() => {
    setVisible(prev => {
      if (prev) {
        onClose?.();
      } else {
        onOpen?.();
      }

      return !prev;
    });
  }, [onClose, onOpen]);

  return React.useMemo<VisibilityControl>(
    () => ({ open, close, visible: visible, toggle }),
    [open, close, visible, toggle]
  );
};
