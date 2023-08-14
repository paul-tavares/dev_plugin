import React, { memo, PropsWithChildren } from 'react';
import { EuiTitle } from '@elastic/eui';

export type HeaderDisplayProps = PropsWithChildren<{}>;

export const HeaderDisplay = memo<HeaderDisplayProps>(({ children }) => {
  return (
    <EuiTitle size="xxs">
      <h3>{children}</h3>
    </EuiTitle>
  );
});
HeaderDisplay.displayName = 'HeaderDisplay';
