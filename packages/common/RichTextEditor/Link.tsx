import { ContentState } from 'draft-js';
import { Children } from '../types';
import { InsertLinkParams } from './types';

type MentionProps = Children & {
  offsetKey: string;
  data: InsertLinkParams;
  contentState: ContentState;
  entityKey: string;
};

export const Link = ({ offsetKey, children, contentState, entityKey }: MentionProps) => {
  const { href, target } = contentState.getEntity(entityKey).getData();

  return (
    <span>
      <a
        href={href}
        target={target}
        rel={target === '_blank' ? 'noreferrer' : undefined}
        data-offset-key={offsetKey}
        className='underline'
      >
        {children}
      </a>
    </span>
  );
};
