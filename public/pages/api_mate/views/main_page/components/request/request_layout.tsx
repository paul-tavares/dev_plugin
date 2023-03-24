import React, { memo } from 'react';
import { EuiTitle } from '@elastic/eui';
import { RequestBody } from './request_body';
import { RequestQueryParams } from './request_query_params';

export const RequestLayout = memo(() => {
  return (
    <div>
      <EuiTitle size="xxs">
        <h3>{'Request'}</h3>
      </EuiTitle>

      <RequestQueryParams />

      <RequestBody />
    </div>
  );
});
RequestLayout.displayName = 'RequestLayout';
