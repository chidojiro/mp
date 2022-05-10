import classNames from 'classnames';

import { Children } from '@/types';

type MentionProps = Children & {
  offsetKey: string;
};

export const Mention = (props: MentionProps) => {
  return (
    <span>
      <span
        className={classNames(
          'mention',
          'inline-block py-0.5 px-2 mx-1 text-white bg-secondary rounded-full text-medium-sm'
        )}
        data-offset-key={props.offsetKey}
      >
        {props.children}
      </span>
    </span>
  );
};
