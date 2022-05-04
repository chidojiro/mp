import { useState } from 'react';
import {
  CompositeDecorator,
  ContentBlock,
  ContentState,
  convertFromRaw,
  Editor,
  EditorState,
} from 'draft-js';
import noop from 'lodash-es/noop';

import { Mention } from '@/components/common/Mention/Mention';
import { ClassName } from '@/types';

type RichMessageViewProps = ClassName & {
  rawContent: string | EditorState;
};

type DecoratorStrategyCallback = (start: number, end: number) => void;
const findEntityRanges = (type: string, contentBlock: ContentBlock, contentState: ContentState) => {
  const ranges: [number, number][] = [];

  contentBlock.findEntityRanges(
    character => {
      const entityKey = character.getEntity();
      return entityKey !== null && contentState.getEntity(entityKey).getType() === type;
    },
    (start, end) => ranges.push([start, end])
  );

  return ranges;
};
const newEntityLocationStrategy = (type: string) => {
  const findEntitiesOfType = (
    contentBlock: ContentBlock,
    callback: DecoratorStrategyCallback,
    contentState: ContentState
  ) => {
    const entityRanges = findEntityRanges(type, contentBlock, contentState);

    entityRanges.forEach(range => {
      callback(...range);
    });
  };
  return findEntitiesOfType;
};

const decorator = new CompositeDecorator([
  {
    strategy: newEntityLocationStrategy('MENTION'),
    component: Mention,
  },
]);

export const RichMessageView = ({ rawContent, className }: RichMessageViewProps) => {
  const [editorState, setEditorState] = useState<EditorState>(
    typeof rawContent === 'string'
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(rawContent)), decorator)
      : rawContent
  );
  return (
    <div className={className}>
      <Editor editorState={editorState} readOnly={true} onChange={noop} />
    </div>
  );
};
