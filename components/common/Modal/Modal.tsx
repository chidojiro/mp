import classNames from 'classnames';

import { Button, ButtonProps } from '@/components/common/Button';
import { Overlay } from '@/components/Layout/Overlay';
import { VisibilityControl } from '@/hooks';
import { Children, ClassName } from '@/types';

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = ClassName &
  Children & {
    control: VisibilityControl;
    onClose?: () => void;
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
export const Modal = ({ control, className, children, onClose }: Props) => {
  const handleClose = () => {
    control.close();
    onClose?.();
  };

  return (
    <Overlay control={control} showCloseButton={false} onBackdropClick={handleClose}>
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
