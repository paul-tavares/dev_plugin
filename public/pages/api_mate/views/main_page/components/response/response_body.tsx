import React, { memo, useMemo } from 'react';
import { EuiCodeBlock } from '@elastic/eui';
import { useApiMateState } from '../../../../components/api_mate_store';

export const ResponseBody = memo(() => {
  const [{ response }] = useApiMateState();

  const responseBody = useMemo(() => {
    if (!response || !response.body) {
      return '';
    }

    return JSON.stringify(response.body, null, 2);
  }, [response]);

  return (
    <EuiCodeBlock lineNumbers={true} isCopyable={true} language="json">
      {responseBody}
    </EuiCodeBlock>
  );
});
ResponseBody.displayName = 'ResponseBody';
