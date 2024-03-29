import { useState, useCallback, useEffect } from 'react';

import copy from 'copy-to-clipboard';

export interface UseClipboardOptions {
  timeout?: number;
  format?: string;
}

export const useClipboard = (text: string, optionsOrTimeout: number | UseClipboardOptions = {}) => {
  const [hasCopied, setHasCopied] = useState(false);

  const { timeout = 1500, ...copyOptions } =
    typeof optionsOrTimeout === 'number' ? { timeout: optionsOrTimeout } : optionsOrTimeout;

  const onCopy = useCallback(() => {
    const didCopy = copy(text, copyOptions);
    setHasCopied(didCopy);
  }, [text, copyOptions]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (hasCopied) {
      timeoutId = setTimeout(() => {
        setHasCopied(false);
      }, timeout);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeout, hasCopied]);

  return { value: text, onCopy, hasCopied };
};
