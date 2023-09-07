import { useCallback } from 'react';
import { HttpFetchOptions, HttpResponse } from '@kbn/core-http-browser';
import { HttpFetchError } from '@kbn/core-http-browser-internal/src/http_fetch_error';
import { useKibanaServices } from '../../../hooks/use_kibana_services';
import { useApiMateState } from '../components/api_mate_store';
import { useApiMateHistory } from '../components/api_mate_history';
import { ApiMateState } from '../types';

export const useSubmitApiRequest = (): (() => Promise<void>) => {
  const { http } = useKibanaServices();
  const [{ url, requestHeaders, requestParams, requestBody, httpVerb }, setStore] =
    useApiMateState();
  const { add: addHistoryItem } = useApiMateHistory();

  return useCallback(async () => {
    // TODO: do validation on data needed

    setStore((prevState) => {
      return {
        ...prevState,
        loading: true,
      };
    });

    let response: HttpResponse | HttpFetchError;

    try {
      const options: HttpFetchOptions & { asResponse: true } = {
        asResponse: true,
        body: requestBody ? requestBody : undefined,
        headers: requestHeaders,
        query: requestParams,
      };

      response = await http[httpVerb](url, options);
    } catch (err) {
      window.console.log(err);

      response = err;
    } finally {
      setStore((prevState) => {
        const updatedState: ApiMateState = {
          ...prevState,
          loading: false,
          responseBody: JSON.stringify(response.body ?? '', null, 2),
          responseStatus: response.response?.status ?? 0,
          responseStatusText: response.response?.statusText ?? '',
        };

        addHistoryItem(updatedState);

        return updatedState;
      });
    }
  }, [addHistoryItem, http, httpVerb, requestBody, requestHeaders, requestParams, setStore, url]);
};
