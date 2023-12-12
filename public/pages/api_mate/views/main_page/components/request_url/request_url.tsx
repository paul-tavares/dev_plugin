import React, { memo, useCallback, useMemo } from 'react';
import {
  EuiButton,
  EuiButtonEmpty,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSuperSelect,
  EuiSuperSelectProps,
} from '@elastic/eui';
import { useApiMateState } from '../../../../components/api_mate_store';
import { useSubmitApiRequest } from '../../../../hooks/use_submit_api_request';
import { DestinationSystem, HttpMethod } from '../../../../types';
import { ApiRouteInput } from './api_route_input';

export const RequestUrl = memo((props) => {
  const [{ loading, httpVerb, url, destination }, setStore] = useApiMateState();
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

  const destSystem: EuiSuperSelectProps<DestinationSystem>['options'] = useMemo(() => {
    return [
      {
        value: 'kibana',
        inputDisplay: 'KBN',
        dropdownDisplay: 'KBN: Kibana',
      },
      {
        value: 'elasticsearch',
        inputDisplay: 'ES',
        dropdownDisplay: 'ES: Elasticsearch',
      },
    ];
  }, []);

  const sendButtonDisabled = useMemo(() => {
    return url.trim().length === 0 || loading;
  }, [loading, url]);

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

  const handleDestinationOnChange: EuiSuperSelectProps<DestinationSystem>['onChange'] = useCallback(
    (value) => {
      setStore((prevState) => {
        return {
          ...prevState,
          destination: value,
        };
      });
    },
    [setStore]
  );

  const handleSendButtonOnClick = useCallback(() => {
    sendRequest();
  }, [sendRequest]);

  const handleClearButtonOnClick = useCallback(() => {
    setStore((prevState) => {
      return {
        ...prevState,
        url: '',
        destination: 'kibana',
        httpVerb: 'get',
        requestHeaders: [],
        requestParams: [],
        requestBody: '',
        responseStatus: 0,
        responseStatusText: '',
        responseBody: '',
      };
    });
  }, [setStore]);

  return (
    <EuiFlexGroup wrap={false} responsive={false} gutterSize="m">
      <EuiFlexItem grow={false}>
        <EuiFlexGroup responsive={false} gutterSize="xs">
          <EuiFlexItem grow={false}>
            <EuiSuperSelect
              options={destSystem}
              onChange={handleDestinationOnChange}
              valueOfSelected={destination ?? 'kibana'}
              fullWidth
              popoverProps={{
                panelMinWidth: 200,
              }}
            />
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiSuperSelect
              options={httpMethodValues}
              onChange={handleHttpMethodOnChange}
              valueOfSelected={httpVerb ?? 'get'}
              fullWidth
              popoverProps={{
                panelMinWidth: 200,
              }}
            />
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiFlexItem>

      <EuiFlexItem>
        <ApiRouteInput />
      </EuiFlexItem>

      <EuiFlexItem grow={false}>
        <EuiFlexGroup responsive={false} gutterSize="s">
          <EuiFlexItem>
            <EuiButton
              iconType="frameNext"
              iconSide="right"
              onClick={handleSendButtonOnClick}
              disabled={sendButtonDisabled}
            >
              {'Send'}
            </EuiButton>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiButtonEmpty onClick={handleClearButtonOnClick} flush="both" disabled={loading}>
              {'Clear'}
            </EuiButtonEmpty>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
});
RequestUrl.displayName = 'RequestUrl';
