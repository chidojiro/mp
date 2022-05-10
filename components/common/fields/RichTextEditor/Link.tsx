import { ContentState } from 'draft-js';

import { Children } from '@/types';

import { InsertLinkParams } from './types';

type MentionProps = Children & {
  offsetKey: string;
  data: InsertLinkParams;
  contentState: ContentState;
  entityKey: string;
};

export const Link = ({ offsetKey, children, contentState, entityKey }: MentionProps) => {
  return (
    <span>
      <a
        href={contentState.getEntity(entityKey).getData().href}
        data-offset-key={offsetKey}
        className='underline'
      >
        {children}
      </a>
    </span>
  );
};
