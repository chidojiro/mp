import { ConditionalWrapper, Portal } from '@/headless';
import { useOnClickOutside, useVisibilityControl, VisibilityControl } from '@/hooks';
import { Children } from '@/types';
import React, { useState } from 'react';
import { PopperProps, usePopper } from 'react-popper';

// eslint-disable-next-line @typescript-eslint/ban-types
export type Props = Pick<PopperProps<any>, 'placement'> &
  Children & {
    usePortal?: boolean;
    trigger: JSX.Element;
    control?: VisibilityControl;
  };

export const Popover = ({
  children,
  usePortal = true,
  trigger,
  control: controlProp,
  placement = 'bottom-start',
}: Props) => {
  const [triggerElement, setTriggerElement] = useState(null);
  const popoverRef = React.useRef(null);

  const { styles, attributes } = usePopper(triggerElement, popoverRef.current, {
    placement,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 4],
        },
      },
    ],
  });

  const ownControl = useVisibilityControl();
  const control = controlProp ?? ownControl;

  const clonedTrigger = React.useMemo(
    () =>
      React.cloneElement(trigger, {
        ref: setTriggerElement,
        onClick: control.toggle,
      }),
    [control, trigger]
  );

  useOnClickOutside([popoverRef, triggerElement], control.close);

  return (
    <>
      {clonedTrigger}
      <ConditionalWrapper active={usePortal} component={Portal as any}>
        <div ref={popoverRef} style={styles.popper} {...attributes.popper}>
          {!!control.visible && children}
        </div>
      </ConditionalWrapper>
    </>
  );
};
