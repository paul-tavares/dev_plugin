import React, { memo } from 'react';
import { EuiHorizontalRule, EuiSpacer, EuiTitle } from '@elastic/eui';

export const HistoryLayout = memo(() => {
  // FIXME:PT work to access styles from EUI using emotion
  return (
    <div style={{ width: '200px' }}>
      <EuiTitle size="xs">
        <h2>{'History'}</h2>
      </EuiTitle>

      <EuiHorizontalRule margin="s" />
      <EuiSpacer size="m" />
    </div>
  );
});
HistoryLayout.displayName = 'HistoryLayout';
