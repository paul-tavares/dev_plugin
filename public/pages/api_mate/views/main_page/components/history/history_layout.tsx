import React, { memo, useMemo } from 'react';
import {
  EuiHorizontalRule,
  EuiSpacer,
  EuiTitle,
  EuiButtonEmpty,
  EuiEmptyPrompt,
  EuiText,
} from '@elastic/eui';
import { useApiMateHistory } from '../../../../components/api_mate_history';
import { createState, useApiMateState } from '../../../../components/api_mate_store';

export const HistoryLayout = memo(() => {
  const { items } = useApiMateHistory();
  const [, setApiMateState] = useApiMateState();

  const historyItems = useMemo(() => {
    if (items.length === 0) {
      return (
        <EuiEmptyPrompt
          body={
            <EuiText>
              <p>{'No history'}</p>
            </EuiText>
          }
          titleSize="xs"
        />
      );
    }

    return items.map(({ created, ...requestState }) => {
      return (
        <EuiButtonEmpty
          key={created}
          onClick={() => {
            setApiMateState({
              ...createState(),
              ...requestState,
            });
          }}
        >
          {requestState.url}
        </EuiButtonEmpty>
      );
    });
  }, [items, setApiMateState]);

  // FIXME:PT work to access styles from EUI using emotion for `width` below
  return (
    <div style={{ width: '200px' }}>
      <EuiTitle size="xs">
        <h2>{'History'}</h2>
      </EuiTitle>

      <EuiHorizontalRule margin="s" />
      <EuiSpacer size="m" />

      {historyItems}
    </div>
  );
});
HistoryLayout.displayName = 'HistoryLayout';
