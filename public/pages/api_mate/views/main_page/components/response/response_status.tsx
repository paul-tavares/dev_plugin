import React, { memo, useMemo } from 'react';
import { EuiBadge } from '@elastic/eui';
import { EuiBadgeProps } from '@elastic/eui/src/components/badge/badge';
import { useApiMateState } from '../../../../components/api_mate_store';

export const ResponseStatus = memo(() => {
  const [{ responseStatus, responseStatusText }] = useApiMateState();

  const badgeColor: EuiBadgeProps['color'] = useMemo(() => {
    if (responseStatus >= 200 && responseStatus < 300) {
      return 'success';
    }

    if (responseStatus >= 400 && responseStatus < 500) {
      return 'warning';
    }

    if (responseStatus >= 500 && responseStatus < 600) {
      return 'danger';
    }

    return 'subdued';
  }, [responseStatus]);

  if (!responseStatus) {
    return null;
  }

  return (
    <EuiBadge color={badgeColor} title={`${responseStatus}: ${responseStatusText}`}>
      {responseStatus}
    </EuiBadge>
  );
});
ResponseStatus.displayName = 'ResponseStatus';
