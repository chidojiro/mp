import { convertFromRaw, convertToRaw, EditorState, RawDraftEntityRange } from 'draft-js';
import { cloneDeep, get, set } from 'lodash-es';

import { richTextEditorDecorator, richTextEditorEmptyValue } from '@/components/common/fields';
import { MentionData, StepMessage } from '@/types';

const draftRawFields = [
  'mail_content.content_draft_raw',
  'mail_content.title_draft_raw',
  'line_messages.text_msg_content_draft_raw',
  'line_messages.flex_msg_head_draft_raw',
  'line_messages.push_msg_content_draft_raw',
];

export const convertToStepMessageRaw = (stepMessage: StepMessage) => {
  const clonedStepMessage: any = cloneDeep(stepMessage);

  const convertEditorStateToJson = (editorState: EditorState | undefined) => {
    if (!editorState) return undefined;

    return JSON.stringify(convertToRaw(editorState.getCurrentContent()));
  };

  draftRawFields.forEach(field => {
    set(clonedStepMessage, field, convertEditorStateToJson(get(stepMessage, field)));
  });

  return clonedStepMessage;
};

export const convertFromStepMessageRaw = (stepMessage: StepMessage) => {
  const clonedStepMessage: any = cloneDeep(stepMessage);

  const convertJsonToEditorState = (json?: string) => {
    if (!json) return undefined;

    return EditorState.createWithContent(
      convertFromRaw(JSON.parse(json as string)),
      richTextEditorDecorator
    );
  };

  draftRawFields.forEach(field => {
    set(clonedStepMessage, field, convertJsonToEditorState(get(stepMessage, field)));
  });

  return clonedStepMessage;
};

const replaceByName = (blockText: string[], name: string, entity: RawDraftEntityRange) => {
  const { offset, length } = entity;
  const firstPart = blockText.slice(0, offset);
  const lastPart = blockText.slice(offset + length);
  return [...firstPart, `{{${name}}}`, ...lastPart];
};

const replaceByContent = (blockText: string[], data: MentionData, entity: RawDraftEntityRange) => {
  const { offset, length } = entity;
  const { name, type, content } = data;
  const firstPart = blockText.slice(0, offset);
  const lastPart = blockText.slice(offset + length);
  if (type === 'static') {
    return [...firstPart, `${content || ''}`, ...lastPart];
  } else {
    return [...firstPart, `{{${name}}}`, ...lastPart];
  }
};

export const getTextFromEditorState = (editorState: EditorState, isPreview = false) => {
  const rawContent = convertToRaw(editorState.getCurrentContent());
  return rawContent.blocks
    .map(({ entityRanges, text }) => {
      let blockText = Array.from(text);
      entityRanges
        .sort((first, second) => second.offset - first.offset)
        .forEach(({ key, offset, length }) => {
          const { data } = rawContent.entityMap[key];
          if (!data) {
            // no-data or without value
            return '';
          }
          if (!isPreview) {
            const { name } = data as MentionData;
            blockText = replaceByName(blockText, name, { key, offset, length });
          } else {
            blockText = replaceByContent(blockText, data as MentionData, { key, offset, length });
          }
        });
      return blockText.join('');
    })
    .join('\n');
};

export const convertToEditorState = (raw?: string) => {
  if (!raw) return richTextEditorEmptyValue;

  return EditorState.createWithContent(convertFromRaw(JSON.parse(raw)), richTextEditorDecorator);
};
