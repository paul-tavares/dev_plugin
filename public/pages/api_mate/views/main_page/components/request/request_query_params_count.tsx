import { EuiNotificationBadge } from '@elastic/eui';
import React, { memo, useMemo } from 'react';
import { useApiMateState } from '../../../../components/api_mate_store';

export const RequestQueryParamsCount = memo(() => {
  const [{ requestParams }] = useApiMateState();

  const headerCount = useMemo(() => {
    return Object.keys(requestParams).length;
  }, [requestParams]);

  if (headerCount === 0) {
    return null;
  }

  return <EuiNotificationBadge color="subdued">{headerCount}</EuiNotificationBadge>;
});
RequestQueryParamsCount.displayName = 'RequestQueryParamsCount';
