import React, { memo, useCallback } from 'react';
import { CodeEditor } from '@kbn/code-editor';
import { CodeEditorProps } from '@kbn/kibana-react-plugin/public';
import { useApiMateState } from '../../../../components/api_mate_store';

export const RequestBody = memo(() => {
  const [{ requestBody }, setStore] = useApiMateState();

  const codeEditorOnChangeHandler: CodeEditorProps['onChange'] = useCallback(
    (value) => {
      setStore((prevState) => {
        return {
          ...prevState,
          requestBody: value,
        };
      });
    },
    [setStore]
  );

  // FIXME: `height` not working in CodeEditor

  return (
    <CodeEditor
      languageId="json"
      height="650px"
      value={(requestBody ?? '') + '\n'.repeat(60)}
      onChange={codeEditorOnChangeHandler}
      transparentBackground
    />
  );
});
RequestBody.displayName = 'RequestBody';
