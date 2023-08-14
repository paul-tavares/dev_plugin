import React, { memo } from 'react';
import { CodeEditor } from '@kbn/code-editor';

export const RequestBody = memo(() => {
  // FIXME: `height` not working in CodeEditor

  return (
    <CodeEditor
      languageId="json"
      height="650px"
      value={JSON.stringify({ one: 'value' }) + '\n'.repeat(60)}
      onChange={() => {}}
      options={{}}
      transparentBackground
    />
  );
});
RequestBody.displayName = 'RequestBody';
