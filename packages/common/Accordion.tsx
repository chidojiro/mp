import React from 'react';
import noop from 'lodash-es/noop';
import { Children, ClassName } from './types';
import { useVisibilityControl } from './useVisibilityControl';
import { VisibilityControl } from './useVisibilityControl';

const Context = React.createContext<{ control: VisibilityControl }>({
  control: { set: noop, open: noop, close: noop, toggle: noop, visible: false },
});

// eslint-disable-next-line @typescript-eslint/ban-types
export type AccordionProps = Children & { control?: VisibilityControl };

// eslint-disable-next-line no-empty-pattern
export const Accordion = ({ control: controlProp, children }: AccordionProps) => {
  const ownControl = useVisibilityControl();

  const control = controlProp ?? ownControl;

  const ProviderValue = React.useMemo(() => ({ control }), [control]);

  return <Context.Provider value={ProviderValue}>{children}</Context.Provider>;
};

type TitleProps = Children & ClassName;

const Title = ({ children, className }: TitleProps) => {
  const { control } = React.useContext(Context);

  return (
    <div className={className} onClick={control.toggle}>
      {children}
    </div>
  );
};

type ContentProps = Children & ClassName;

const Content = ({ children, className }: ContentProps) => {
  const { control } = React.useContext(Context);

  if (!control.visible) return null;

  return <div className={className}>{children}</div>;
};

Accordion.Title = Title;
Accordion.Content = Content;
