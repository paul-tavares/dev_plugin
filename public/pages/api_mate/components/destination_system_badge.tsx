import React, { memo, useMemo } from 'react';
import { EuiBadge, type EuiBadgeProps } from '@elastic/eui';
import { DestinationSystem } from '../types';

export interface DestinationSystemBadgeProps {
  value: DestinationSystem;
}

export const DestinationSystemBadge = memo<DestinationSystemBadgeProps>(({ value }) => {
  const label = useMemo(() => {
    switch (value) {
      case 'elasticsearch':
        return 'ES';
      case 'kibana':
        return 'KB';
      default:
        return '';
    }
  }, [value]);

  const icon: EuiBadgeProps['iconType'] = useMemo(() => {
    switch (value) {
      case 'elasticsearch':
        return 'logoElasticsearch';
      case 'kibana':
        return 'logoKibana';
      default:
        return undefined;
    }
  }, [value]);

  return value ? (
    <EuiBadge color="hollow" iconType={icon}>
      {label}
    </EuiBadge>
  ) : (
    <></>
  );
});
DestinationSystemBadge.displayName = 'DestinationSystemBadge';
