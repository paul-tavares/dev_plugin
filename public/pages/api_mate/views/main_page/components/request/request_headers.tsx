import React, { memo, useCallback } from 'react';
import { KeyValuePairs, KeyValuePairsProps } from './key_value_pairs';
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

  return (
    <div>
      <KeyValuePairs value={requestHeaders} onChange={keyValuePairsOnChangeHandler} />
    </div>
  );
});
RequestHeaders.displayName = 'RequestHeaders';
