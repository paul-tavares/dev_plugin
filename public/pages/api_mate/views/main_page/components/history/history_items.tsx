import React, { memo, useMemo } from 'react';
import { EuiButtonEmpty, EuiEmptyPrompt, EuiText } from '@elastic/eui';
import { useApiMateHistory } from '../../../../components/api_mate_history';
import { createState, useApiMateState } from '../../../../components/api_mate_store';
import { TextTruncate } from '../../../../components/text_truncate';

export const HistoryItems = memo(() => {
  const { items } = useApiMateHistory();
  const [, setApiMateState] = useApiMateState();

  const entryList = useMemo(() => {
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
          title={requestState.url}
        >
          <TextTruncate value={requestState.url} />
        </EuiButtonEmpty>
      );
    });
  }, [items, setApiMateState]);

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

  return <div>{entryList}</div>;
});
HistoryItems.displayName = 'HistoryItems';
