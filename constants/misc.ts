export const MentionValuePattern = /<span class="mention-item"[^\/]*<\/span>/g;
export const ZeroWidthWhitespace = '&#8203;';
export const EmailPattern =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const DynamicVariablePattern = /\{\{\w+\}\}/g;
