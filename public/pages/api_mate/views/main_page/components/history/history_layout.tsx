import React, { memo } from 'react';
import { EuiHorizontalRule, EuiSpacer, EuiTitle } from '@elastic/eui';
import { HistoryItems } from './history_items';

export const HistoryLayout = memo(() => {
  // FIXME:PT work to access styles from EUI using emotion for `width` below
  return (
    <div style={{ width: '200px' }}>
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
