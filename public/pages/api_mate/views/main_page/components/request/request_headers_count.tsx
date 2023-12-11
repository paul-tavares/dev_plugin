import { EuiNotificationBadge } from '@elastic/eui';
import React, { memo, useMemo } from 'react';
import { useApiMateState } from '../../../../components/api_mate_store';

export const RequestHeadersCount = memo(() => {
  const [{ requestHeaders }] = useApiMateState();

  const headerCount = useMemo(() => {
    return Object.keys(requestHeaders).length;
  }, [requestHeaders]);

  if (headerCount === 0) {
    return null;
  }

  return <EuiNotificationBadge color="subdued">{headerCount}</EuiNotificationBadge>;
});
RequestHeadersCount.displayName = 'RequestHeadersCount';
