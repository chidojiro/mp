import classNames from 'classnames';

import { Overlay } from '@/components';
import { VisibilityControl } from '@/hooks';
import { Children, ClassName } from '@/types';

import { Button, ButtonProps } from '..';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = ClassName &
  Children & {
    control: VisibilityControl;
  };

const Header = ({ children, className }: ClassName & Children) => {
  return (
    <div className={classNames('text-regular font-bold text-center mb-5', className)}>
      {children}
    </div>
  );
};

const Body = ({ children, className }: ClassName & Children) => {
  return <div className={classNames(className)}>{children}</div>;
};

const Footer = ({ children, className }: ClassName & Children) => {
  return (
    <div className={classNames('mt-5', 'flex justify-center min-h-[36px] gap-2', className)}>
      {children}
    </div>
  );
};

const FooterButton = (props: ButtonProps) => (
  <Button {...props} className={classNames('w-[240px]', props.className)} />
);

// eslint-disable-next-line no-empty-pattern
export const Modal = ({ control, className, children }: Props) => {
  return (
    <Overlay control={control} showCloseButton={false} onBackdropClick={control.close}>
      <div className={classNames('mp-modal', 'p-10 rounded-md bg-white w-[800px]', className)}>
        {children}
      </div>
    </Overlay>
  );
};

Modal.Header = Header;
Modal.Body = Body;
Modal.Footer = Footer;
Modal.FooterButton = FooterButton;
