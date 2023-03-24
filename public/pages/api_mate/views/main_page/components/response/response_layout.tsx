import React, { memo } from 'react';
import { EuiTitle } from '@elastic/eui';
import { ResponseBody } from './response_body';

export const ResponseLayout = memo(() => {
  return (
    <div>
      <EuiTitle size="xxs">
        <h3>{'Response'}</h3>
      </EuiTitle>

      <ResponseBody />
    </div>
  );
});
ResponseLayout.displayName = 'ResponseLayout';
