import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import { cloneDeep, get, set } from 'lodash-es';

import { richTextEditorDecorator, richTextEditorEmptyValue } from '@/common/RichTextEditor';
import { StepMessage } from '@/marketing-action/types';
import { Carousel } from '@/marketing-action/types';

const draftRawFields = [
  'mail_content.content_draft_raw',
  'mail_content.title_draft_raw',
  'line_message.text_msg_content_draft_raw',
  'line_message.flex_msg_head_draft_raw',
  'line_message.push_msg_content_draft_raw',
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

export const convertToCarouselRaw = (carousel: Carousel) => {
  const clonedCarousel: any = cloneDeep(carousel);

  const convertEditorStateToJson = (editorState: EditorState | undefined) => {
    if (!editorState) return undefined;

    return JSON.stringify(convertToRaw(editorState.getCurrentContent()));
  };

  clonedCarousel.content_draft_raw = convertEditorStateToJson(
    carousel.content_draft_raw as EditorState
  );
  clonedCarousel.title_draft_raw = convertEditorStateToJson(
    carousel.title_draft_raw as EditorState
  );

  return clonedCarousel;
};

export const convertFromCarouselRaw = (carousel: Carousel) => {
  const clonedCarousel: any = cloneDeep(carousel);

  const convertJsonToEditorState = (json?: string) => {
    if (!json) return undefined;

    return EditorState.createWithContent(
      convertFromRaw(JSON.parse(json as string)),
      richTextEditorDecorator
    );
  };

  clonedCarousel.content_draft_raw = convertJsonToEditorState(carousel.content_draft_raw as string);
  clonedCarousel.title_draft_raw = convertJsonToEditorState(carousel.title_draft_raw as string);

  return clonedCarousel;
};

export const getEntityRange = (text: string, entity: string) => {
  return {
    offset: text.indexOf(entity),
    length: entity.length,
  };
};

export const convertToEditorState = (raw?: string) => {
  if (!raw) return richTextEditorEmptyValue;

  return EditorState.createWithContent(convertFromRaw(JSON.parse(raw)), richTextEditorDecorator);
};

export const getDefaultMessageContentState = (text: string, data: any[] = []) => {
  const { entityMap, entityRanges } = data.reduce(
    (prev, entity, index) => ({
      entityMap: {
        ...prev.entityMap,
        [index]: {
          type: 'MENTION',
          mutability: 'IMMUTABLE',
          data: {
            name: entity.name,
            type: 'static',
            marketing_action_alias: null,
            name_display: entity.displayName,
          },
        },
      },
      entityRanges: [
        ...prev.entityRanges,
        { ...getEntityRange(text, entity.displayName), key: index },
      ],
    }),
    { entityMap: {}, entityRanges: [] }
  );

  const defaultMessageContentRaw = JSON.stringify({
    blocks: [
      {
        text,
        type: 'unstyled',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: entityRanges,
        data: {},
      },
    ],
    entityMap: entityMap,
  });

  return convertToEditorState(defaultMessageContentRaw);
};
