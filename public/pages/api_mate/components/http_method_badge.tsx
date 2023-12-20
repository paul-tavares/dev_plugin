import React, { memo } from 'react';
import { EuiBadge } from '@elastic/eui';

export interface HttpMethodBadgeProps {
  children: string;
}

export const HttpMethodBadge = memo(({ children }: HttpMethodBadgeProps) => {
  return <EuiBadge>{children.toUpperCase()}</EuiBadge>;
});
HttpMethodBadge.displayName = 'HttpMethodBadge';
