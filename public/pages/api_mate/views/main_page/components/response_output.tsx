import React, { memo, useMemo } from 'react';
import { EuiCodeBlock, EuiTitle } from '@elastic/eui';
import { useApiMateState } from '../../../components/api_mate_store';

export const ResponseOutput = memo(() => {
  const [{ response }] = useApiMateState();

  const responseBody = useMemo(() => {
    if (!response || !response.body) {
      return '';
    }

    return JSON.stringify(response.body, null, 2);
  }, [response]);

  return (
    <div>
      <EuiTitle size="xxs">
        <h3>{'Response'}</h3>
      </EuiTitle>
      <EuiCodeBlock lineNumbers={true} isCopyable={true} language="json">
        {responseBody}
      </EuiCodeBlock>
    </div>
  );
});
ResponseOutput.displayName = 'ResponseOutput';
