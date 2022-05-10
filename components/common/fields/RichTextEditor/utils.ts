import {
  CompositeDecorator,
  ContentBlock,
  ContentState,
  convertFromRaw,
  convertToRaw,
  EditorState,
  Modifier,
  SelectionState,
} from 'draft-js';

import { Link } from './Link';
import { Mention } from './Mention';
import { MentionTrigger } from './MentionTrigger';

type DecoratorStrategyCallback = (start: number, end: number) => void;

export const getCurrentBlock = (editorState: EditorState) => {
  if (editorState.getSelection) {
    const selectionState = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const block = contentState.getBlockForKey(selectionState.getStartKey());
    return block;
  }
};

export const findEntityRanges = (
  type: string,
  contentBlock: ContentBlock,
  contentState: ContentState
) => {
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

export const newEntityLocationStrategy = (type: string) => {
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

export const decorator = new CompositeDecorator([
  {
    strategy: newEntityLocationStrategy('MENTION_TRIGGER'),
    component: MentionTrigger,
  },
  {
    strategy: newEntityLocationStrategy('MENTION'),
    component: Mention,
  },
  {
    strategy: newEntityLocationStrategy('LINK'),
    component: Link,
  },
]);

type ReplaceTextParams = {
  editorState: EditorState;
  entityType?: string;
  start?: number;
  end?: number;
  newText: string;
  data?: any;
  mutability?: 'MUTABLE' | 'IMMUTABLE';
};

export const replaceText = (params: ReplaceTextParams) => {
  const {
    editorState,
    entityType,
    start: startParam,
    end: endParam,
    newText,
    mutability,
    data,
  } = params;

  const start = startParam ?? editorState.getSelection().getStartOffset();
  const end = endParam ?? editorState.getSelection().getEndOffset();

  const currentBlock = getCurrentBlock(editorState);
  if (!currentBlock) {
    return editorState;
  }
  const blockKey = currentBlock.getKey();

  const isWithEntity = entityType && mutability;

  const contentState = editorState.getCurrentContent();
  const modifiedContentState = isWithEntity
    ? contentState.createEntity(entityType, mutability, data)
    : contentState;
  const entityKey = isWithEntity ? modifiedContentState.getLastCreatedEntityKey() : undefined;

  const contentStateWithReplacedText = Modifier.replaceText(
    modifiedContentState,
    new SelectionState({
      anchorKey: blockKey,
      anchorOffset: start,
      focusKey: blockKey,
      focusOffset: end,
      isBackward: false,
      hasFocus: true,
    }),
    newText,
    undefined,
    entityKey
  );

  const newEditorState = EditorState.set(editorState, {
    currentContent: contentStateWithReplacedText,
    selection: new SelectionState({
      anchorKey: blockKey,
      anchorOffset: start + newText.length,
      focusKey: blockKey,
      focusOffset: start + newText.length,
      isBackward: false,
      hasFocus: true,
    }),
  });

  return newEditorState;
};

export const getPlainTextWithInterpolatedMentionValue = (editorState: EditorState) => {
  const rawContent = convertToRaw(editorState.getCurrentContent());

  const newBlocks = rawContent.blocks.map(({ entityRanges, text, ...restBlock }) => {
    const { segments } = entityRanges.reduce(
      (acc, curRange) => {
        if (rawContent.entityMap[curRange.key].type !== 'MENTION') return acc;

        const { segments, offset } = acc;

        const mentionValue = rawContent.entityMap[curRange.key].data.value;

        return {
          segments: [
            ...segments.slice(0, segments.length - 1),
            segments[segments.length - 1].slice(0, curRange.offset - offset),
            mentionValue,
            segments[segments.length - 1].slice(curRange.offset - offset + curRange.length),
          ],
          offset: curRange.offset + curRange.length,
        };
      },
      { segments: [text], offset: 0 }
    );

    return { text: segments.join(''), entityRanges: [], ...restBlock };
  });

  return convertFromRaw({
    blocks: newBlocks,
    entityMap: {},
  }).getPlainText();
};

export const emptyValue = EditorState.createEmpty(decorator);
