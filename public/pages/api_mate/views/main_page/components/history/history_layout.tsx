import React, { memo } from 'react';
import { EuiHorizontalRule, EuiSpacer, EuiTitle } from '@elastic/eui';
import { HistoryItems } from './history_items';

export const HistoryLayout = memo(() => {
  return (
    <div style={{ width: '20vw', minWidth: '250px' }}>
      <EuiTitle size="xs">
        <h2>{'History'}</h2>
      </EuiTitle>

      <EuiHorizontalRule margin="s" />
      <EuiSpacer size="m" />

      <HistoryItems />
    </div>
  );
});
HistoryLayout.displayName = 'HistoryLayout';
