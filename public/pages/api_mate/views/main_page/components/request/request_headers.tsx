import React, { memo, useCallback, useMemo } from 'react';
import { EuiButton, EuiSpacer, EuiText } from '@elastic/eui';
import { v4 as uuidV4 } from 'uuid';
import { KeyValuePairs, KeyValuePairsEmptyState, KeyValuePairsProps } from './key_value_pairs';
import { useApiMateState } from '../../../../components/api_mate_store';

export const RequestHeaders = memo(() => {
  const [{ requestHeaders }, setApiMateState] = useApiMateState();

  const keyValuePairsOnChangeHandler: KeyValuePairsProps['onChange'] = useCallback(
    (newHeaders) => {
      setApiMateState((prevState) => {
        return {
          ...prevState,
          requestHeaders: newHeaders,
        };
      });
    },
    [setApiMateState]
  );

  const emptyState = useMemo(() => {
    return (
      <EuiText size="s">
        <KeyValuePairsEmptyState />

        <EuiSpacer />

        <div>
          <EuiButton
            color="text"
            onClick={() => {
              keyValuePairsOnChangeHandler([
                {
                  name: 'elastic-api-version',
                  value: '2023-10-31',
                  id: uuidV4(),
                },
              ]);
            }}
          >
            {'Add Elastic API Version header'}
          </EuiButton>
        </div>
      </EuiText>
    );
  }, [keyValuePairsOnChangeHandler]);

  return (
    <div>
      <KeyValuePairs
        value={requestHeaders}
        onChange={keyValuePairsOnChangeHandler}
        emptyState={emptyState}
      />
    </div>
  );
});
RequestHeaders.displayName = 'RequestHeaders';
