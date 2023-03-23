import React, { memo, useCallback } from 'react';
import { EuiFieldText, EuiFlexGroup, EuiFlexItem, EuiButton } from '@elastic/eui';
import { useApiMateState } from '../../../components/api_mate_store';
import { useSubmitApiRequest } from '../../../hooks/use_submit_api_request';

export interface RequestUrlProps {
  // TODO: define props
}

export const RequestUrl = memo<RequestUrlProps>((props) => {
  const [{ url }, setStore] = useApiMateState();
  const sendRequest = useSubmitApiRequest();

  // TODO:PT implement Send button click

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

  return (
    <EuiFlexGroup wrap={false} responsive={false}>
      <EuiFlexItem grow={false}>{'verb'}</EuiFlexItem>

      <EuiFlexItem>
        <EuiFieldText
          placeholder="API URL (relative to hostname). Example: /api/endpoint/something"
          value={url}
          onChange={handleInputOnChange}
          onKeyUp={handleInputOnKeyUp}
          aria-label="Enter API url"
          fullWidth
        />
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiButton iconType="frameNext" iconSide="right" onClick={() => {}}>
          {'Send'}
        </EuiButton>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
});
RequestUrl.displayName = 'RequestUrl';
