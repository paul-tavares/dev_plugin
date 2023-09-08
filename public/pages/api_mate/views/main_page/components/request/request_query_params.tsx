import React, { memo, useCallback } from 'react';
import { useApiMateState } from '../../../../components/api_mate_store';
import { KeyValuePairs } from './key_value_pairs';

export const RequestQueryParams = memo(() => {
  const [{ requestParams }, setApiMateState] = useApiMateState();

  const keyValuePairsOnChangeHandler = useCallback(
    (newParams) => {
      setApiMateState((prevState) => {
        return {
          ...prevState,
          requestParams: newParams,
        };
      });
    },
    [setApiMateState]
  );

  return (
    <div>
      <KeyValuePairs value={requestParams} onChange={keyValuePairsOnChangeHandler} />
    </div>
  );
});
RequestQueryParams.displayName = 'RequestQueryParams';
