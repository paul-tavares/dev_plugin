import React, { memo, useCallback } from 'react';
import { EuiFieldText, EuiFlexGroup, EuiFlexItem, EuiButton } from '@elastic/eui';
import { useApiMateState } from '../../../components/api_mate_store';
import { useSubmitApiRequest } from '../../../hooks/use_submit_api_request';

export interface RequestUrlProps {
  // TODO: define props
}

export const RequestUrl = memo<RequestUrlProps>((props) => {
  const [{ url, loading }, setStore] = useApiMateState();
  const sendRequest = useSubmitApiRequest();

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
      if (ev.key === 'Enter') {
        sendRequest();
      }
    },
    [sendRequest]
  );

  const handleSendButtonOnClick = useCallback(() => {
    sendRequest();
  }, [sendRequest]);

  return (
    <EuiFlexGroup wrap={false} responsive={false}>
      <EuiFlexItem grow={false}>{'verb'}</EuiFlexItem>

      <EuiFlexItem>
        <EuiFieldText
          placeholder="API URL (relative to hostname). Example: /api/endpoint/something"
          value={url}
          disabled={loading}
          onChange={handleInputOnChange}
          onKeyUp={handleInputOnKeyUp}
          aria-label="Enter API url"
          fullWidth
        />
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButton
          iconType="frameNext"
          iconSide="right"
          onClick={handleSendButtonOnClick}
          disabled={loading}
        >
          {'Send'}
        </EuiButton>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
});
RequestUrl.displayName = 'RequestUrl';
