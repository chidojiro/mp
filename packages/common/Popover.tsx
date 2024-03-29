import React, { useState } from 'react';
import { PopperProps, usePopper } from 'react-popper';

import { Children } from './types';
import { ConditionalWrapper, Portal } from '@/headless';
import { useVisibilityControl } from './useVisibilityControl';
import { VisibilityControl } from './useVisibilityControl';
import { useOnClickOutside } from './useOnClickOutside';

// eslint-disable-next-line @typescript-eslint/ban-types
export type PopoverProps = Pick<PopperProps<any>, 'placement'> &
  Children & {
    usePortal?: boolean;
    trigger: JSX.Element | HTMLElement;
    control?: VisibilityControl;
    offset?: [number, number];
    closeOnClickOutside?: boolean;
  };

export const Popover = ({
  children,
  usePortal = true,
  trigger,
  control: controlProp,
  placement = 'bottom-start',
  offset = [0, 4],
  closeOnClickOutside = true,
}: PopoverProps) => {
  const [triggerElement, setTriggerElement] = useState(null);
  const popoverRef = React.useRef(null);

  const isHTMLElementTrigger = !!(trigger as HTMLElement)?.tagName;

  const { styles, attributes, forceUpdate } = usePopper(
    isHTMLElementTrigger ? (trigger as any) : triggerElement,
    popoverRef.current,
    {
      placement,
      modifiers: [
        {
          name: 'offset',
          options: {
            offset,
          },
        },
      ],
    }
  );

  React.useEffect(() => {
    forceUpdate?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger, forceUpdate, (trigger as HTMLElement)?.innerHTML]);

  const ownControl = useVisibilityControl();
  const control = controlProp ?? ownControl;

  const clonedTrigger = React.useMemo(() => {
    if (isHTMLElementTrigger || !trigger) return null;

    return React.cloneElement(trigger as any, {
      ref: setTriggerElement,
      onClick: control.toggle,
    });
  }, [control.toggle, isHTMLElementTrigger, trigger]);

  useOnClickOutside(closeOnClickOutside && [popoverRef, triggerElement], control.close);

  return (
    <>
      {clonedTrigger}
      <ConditionalWrapper active={usePortal} component={Portal as any}>
        <div ref={popoverRef} style={styles.popper} {...attributes.popper}>
          {!!control.visible && <div className='animate-fade-in'>{children}</div>}
        </div>
      </ConditionalWrapper>
    </>
  );
};
