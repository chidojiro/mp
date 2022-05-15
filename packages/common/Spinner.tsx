import classNames from 'classnames';

import styles from './Spinner.module.css';

export type SpinnerProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
};

// eslint-disable-next-line no-empty-pattern
export const Spinner = ({ className, size = 20, ...restProps }: SpinnerProps) => {
  return (
    <svg
      viewBox='0 0 50 50'
      className={classNames('loader', className)}
      width={size}
      height={size}
      {...restProps}
    >
      <circle className={styles['spinner__ring']} cx='25' cy='25' r='22.5' />
      <circle className={styles['spinner__line']} cx='25' cy='25' r='22.5' />
    </svg>
  );
};
