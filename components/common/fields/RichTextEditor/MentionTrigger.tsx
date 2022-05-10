import { Children } from '@/types';

type Props = Children & {
  offsetKey: string;
};

export const MentionTrigger = ({ offsetKey, children }: Props) => {
  return (
    <span className='mention-trigger' data-offset-key={offsetKey}>
      {children}
    </span>
  );
};
