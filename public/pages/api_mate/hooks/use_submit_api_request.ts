import { useCallback } from 'react';
import { HttpFetchOptions, HttpFetchQuery, HttpResponse } from '@kbn/core-http-browser';
import { HttpFetchError } from '@kbn/core-http-browser-internal/src/http_fetch_error';
import { useKibanaServices } from '../../../hooks/use_kibana_services';
import { useApiMateState } from '../components/api_mate_store';
import { useApiMateHistory } from '../components/api_mate_history';
import { ApiMateState } from '../types';

export const useSubmitApiRequest = (): (() => Promise<void>) => {
  const { http } = useKibanaServices();
  const [{ url, requestHeaders, requestParams, requestBody, httpVerb, destination }, setStore] =
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
    let wasSuccess = false;

    try {
      const headers = requestHeaders.reduce((acc, headerEntry) => {
        acc[headerEntry.name] = headerEntry.value;
        return acc;
      }, {} as Record<string, string>);

      const query = requestParams.reduce((acc, paramEntry) => {
        if (!acc[paramEntry.name]) {
          acc[paramEntry.name] = [];
        }

        (acc[paramEntry.name] as string[]).push(paramEntry.value);

        return acc;
      }, {} as HttpFetchQuery);

      const options: HttpFetchOptions & { asResponse: true } = {
        asResponse: true,
        body: requestBody.trim() ? requestBody : undefined,
        headers,
        query,
        version: headers['elastic-api-version'],
      };

      if (destination === 'elasticsearch') {
        const searchParams = new URLSearchParams();

        for (const [key, value] of Object.entries(query)) {
          for (const valueElement of value as string[]) {
            if (searchParams.has(key)) {
              searchParams.append(key, valueElement);
            } else {
              searchParams.set(key, valueElement);
            }
          }
        }

        response = await http.post('/api/console/proxy', {
          ...options,
          query: {
            method: httpVerb.toUpperCase(),
            path: url + '?' + searchParams.toString(),
          },
        });
      } else {
        response = await http[httpVerb](url, options);
      }

      wasSuccess = true;
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

        addHistoryItem({
          ...updatedState,
          wasSuccess,
        });

        return updatedState;
      });
    }
  }, [
    addHistoryItem,
    destination,
    http,
    httpVerb,
    requestBody,
    requestHeaders,
    requestParams,
    setStore,
    url,
  ]);
};
