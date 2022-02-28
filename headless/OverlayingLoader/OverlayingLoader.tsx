import React, { ForwardedRef } from 'react';
import { useOverlayProps, useOverlay } from 'hooks';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = Omit<useOverlayProps, 'host'> & { children: JSX.Element };

// eslint-disable-next-line no-empty-pattern
export const OverlayingLoader = React.forwardRef(
  ({ children, active, component }: Props, ref: ForwardedRef<HTMLElement>) => {
    const internalRef = React.useRef<HTMLElement>(null);

    React.useImperativeHandle(ref, () => internalRef.current as any);

    const clonedChildren = React.cloneElement(children, { ref: internalRef });

    useOverlay({ active, host: internalRef, component });

    return <>{clonedChildren}</>;
  }
);

OverlayingLoader.displayName = 'OverlayingLoader';
