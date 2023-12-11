import React, { memo, useCallback, useState } from 'react';
import { EuiButtonIcon, EuiFieldText, EuiInputPopover } from '@elastic/eui';
import { useApiMateState } from '../../../../components/api_mate_store';
import { useSubmitApiRequest } from '../../../../hooks/use_submit_api_request';
import { ApiRouteSuggestions } from './api_route_suggestions';

export const ApiRouteInput = memo(() => {
  const [{ url, loading }, setStore] = useApiMateState();
  const sendRequest = useSubmitApiRequest();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleInputOnChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (ev) => {
      setStore((prevState) => {
        return {
          ...prevState,
          url: ev.target.value,
        };
      });
    },
    [setStore]
  );

  const handleInputOnKeyUp: React.KeyboardEventHandler<HTMLInputElement> = useCallback(
    (ev) => {
      if (ev.key === 'Enter' && url.trim().length > 0) {
        sendRequest();
      }
    },
    [sendRequest]
  );

  const inputOnKeyDownHandler: React.KeyboardEventHandler<HTMLInputElement> = useCallback((ev) => {
    if (ev.key === 'ArrowDown') {
      setIsPopoverOpen(true);
    }
  }, []);

  const closePopoverHandler = useCallback(() => {
    setIsPopoverOpen(false);
  }, []);

  const suggestionSelectionHandler = useCallback(() => {
    setIsPopoverOpen(false);
  }, []);

  const showSuggestionsButtonOnClickHandler = useCallback(() => {
    setIsPopoverOpen((prevState) => !prevState);
  }, []);

  return (
    <EuiInputPopover
      input={
        <EuiFieldText
          placeholder="API route. Click [Arrow Down] key to see history. Example: /api/endpoint/something"
          value={url}
          disabled={loading}
          onChange={handleInputOnChange}
          onKeyUp={handleInputOnKeyUp}
          onKeyDown={inputOnKeyDownHandler}
          aria-label="Enter API url"
          fullWidth
          append={
            <EuiButtonIcon
              iconType="arrowDown"
              aria-label="Show suggestions"
              onClick={showSuggestionsButtonOnClickHandler}
              title={'Key: [Arrow Down]'}
            />
          }
        />
      }
      style={{ maxWidth: '100%' }}
      isOpen={isPopoverOpen}
      closePopover={closePopoverHandler}
      anchorPosition="downCenter"
      display="block"
    >
      <ApiRouteSuggestions onSelect={suggestionSelectionHandler} />
    </EuiInputPopover>
  );
});
ApiRouteInput.displayName = 'ApiRouteInput';
