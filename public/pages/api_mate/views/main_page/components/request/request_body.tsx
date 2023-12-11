import React, { memo, useCallback, useMemo } from 'react';
import { CodeEditor } from '@kbn/code-editor';
import { CodeEditorProps } from '@kbn/kibana-react-plugin/public';
import { useEuiTheme } from '@elastic/eui';
import { useApiMateState } from '../../../../components/api_mate_store';

const MIN_EDITOR_LINES = 15;

export const RequestBody = memo(() => {
  const [{ requestBody }, setStore] = useApiMateState();
  const theme = useEuiTheme();

  const bottomEmptyLines = useMemo(() => {
    const contentLineCount = requestBody.split(/\n/).length;

    if (contentLineCount >= MIN_EDITOR_LINES) {
      return '';
    }

    return '\n'.repeat(MIN_EDITOR_LINES - contentLineCount);
  }, [requestBody]);

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

  return (
    <div
      style={{
        background: theme.euiTheme.colors.lightestShade,
      }}
    >
      <CodeEditor
        languageId="json"
        height="30vh"
        value={(requestBody ?? '') + bottomEmptyLines}
        onChange={codeEditorOnChangeHandler}
        transparentBackground
      />
    </div>
  );
});
RequestBody.displayName = 'RequestBody';
