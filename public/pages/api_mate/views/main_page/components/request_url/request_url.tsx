import React, { memo, useCallback, useMemo } from 'react';
import {
  EuiButton,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSuperSelect,
  EuiSuperSelectProps,
} from '@elastic/eui';
import { useApiMateState } from '../../../../components/api_mate_store';
import { useSubmitApiRequest } from '../../../../hooks/use_submit_api_request';
import { HttpMethod } from '../../../../types';
import { ApiRouteInput } from './api_route_input';

export const RequestUrl = memo((props) => {
  const [{ loading, httpVerb }, setStore] = useApiMateState();
  const sendRequest = useSubmitApiRequest();

  const httpMethodValues: EuiSuperSelectProps<HttpMethod>['options'] = useMemo(() => {
    return [
      {
        value: 'get',
        inputDisplay: 'GET',
        dropdownDisplay: 'GET',
      },
      {
        value: 'post',
        inputDisplay: 'POST',
        dropdownDisplay: 'POST',
      },
      {
        value: 'put',
        inputDisplay: 'PUT',
        dropdownDisplay: 'PUT',
      },
      {
        value: 'delete',
        inputDisplay: 'DELETE',
        dropdownDisplay: 'DELETE',
      },
      {
        value: 'head',
        inputDisplay: 'HEAD',
        dropdownDisplay: 'HEAD',
      },
      {
        value: 'patch',
        inputDisplay: 'PATCH',
        dropdownDisplay: 'PATCH',
      },
      {
        value: 'options',
        inputDisplay: 'OPTIONS',
        dropdownDisplay: 'OPTIONS',
      },
    ];
  }, []);

  const handleHttpMethodOnChange: EuiSuperSelectProps<HttpMethod>['onChange'] = useCallback(
    (value) => {
      setStore((prevState) => {
        return {
          ...prevState,
          httpVerb: value,
        };
      });
    },
    [setStore]
  );

  const handleSendButtonOnClick = useCallback(() => {
    sendRequest();
  }, [sendRequest]);

  return (
    <EuiFlexGroup wrap={false} responsive={false} gutterSize="m">
      <EuiFlexItem grow={false}>
        <EuiSuperSelect
          options={httpMethodValues}
          onChange={handleHttpMethodOnChange}
          valueOfSelected={httpVerb ?? 'get'}
          fullWidth
          popoverProps={{
            panelMinWidth: 140,
          }}
        />
      </EuiFlexItem>

      <EuiFlexItem>
        <ApiRouteInput />
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
