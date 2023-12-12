import React, { memo, useMemo } from 'react';
import { EuiBadge } from '@elastic/eui';
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

  return value ? <EuiBadge>{label}</EuiBadge> : <></>;
});
DestinationSystemBadge.displayName = 'DestinationSystemBadge';
