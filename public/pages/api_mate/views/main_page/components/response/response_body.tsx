import React, { memo } from 'react';
import { EuiCodeBlock } from '@elastic/eui';
import { useApiMateState } from '../../../../components/api_mate_store';

export const ResponseBody = memo(() => {
  const [{ responseBody }] = useApiMateState();

  return (
    <EuiCodeBlock lineNumbers={true} isCopyable={true} language="json">
      {responseBody}
    </EuiCodeBlock>
  );
});
ResponseBody.displayName = 'ResponseBody';
