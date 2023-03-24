import React, { memo } from 'react';
import { CodeEditor } from '@kbn/code-editor';

export const RequestBody = memo(() => {
  // FIXME: `height` not working in CodeEditor

  return (
    <CodeEditor
      languageId="json"
      height="650px"
      value="{ one: 'value' }"
      onChange={() => {}}
      transparentBackground
    />
  );
});
RequestBody.displayName = 'RequestBody';
