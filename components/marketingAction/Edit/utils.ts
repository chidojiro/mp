import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import { cloneDeep } from 'lodash-es';

import { richTextEditorDecorator } from '@/components/common/fields';
import { StepMessage } from '@/types';

export const convertToStepMessageRaw = (stepMessage: StepMessage) => {
  const clonedStepMessage: any = cloneDeep(stepMessage);

  const convertEditorStateToJson = (editorState: EditorState | undefined) => {
    if (!editorState) return undefined;

    return JSON.stringify(convertToRaw(editorState.getCurrentContent()));
  };

  clonedStepMessage.mail_content.content_draft_raw = convertEditorStateToJson(
    stepMessage.mail_content.content_draft_raw as EditorState
  );
  clonedStepMessage.mail_content.title_draft_raw = convertEditorStateToJson(
    stepMessage.mail_content.title_draft_raw as EditorState
  );
  clonedStepMessage.line_messages.text_msg_content_draft_raw = convertEditorStateToJson(
    stepMessage.line_messages.text_msg_content_draft_raw as EditorState
  );

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

  clonedStepMessage.mail_content.content_draft_raw = convertJsonToEditorState(
    stepMessage.mail_content.content_draft_raw as string
  );
  clonedStepMessage.mail_content.title_draft_raw = convertJsonToEditorState(
    stepMessage.mail_content.title_draft_raw as string
  );
  clonedStepMessage.line_messages.text_msg_content_draft_raw = convertJsonToEditorState(
    stepMessage.line_messages.text_msg_content_draft_raw as string
  );

  return clonedStepMessage;
};
