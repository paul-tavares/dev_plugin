import { useCallback } from 'react';
import { useKibanaServices } from '../../../hooks/use_kibana_services';
import { useApiMateState } from '../components/api_mate_store';

export const useSubmitApiRequest = (): (() => Promise<void>) => {
  const { http } = useKibanaServices();
  const [{ url, requestHeaders, requestBody, httpVerb }, setStore] = useApiMateState();

  return useCallback(async () => {
    // TODO: do validation on data needed

    setStore((prevState) => {
      return {
        ...prevState,
        loading: true,
      };
    });

    try {
      const response = await http[httpVerb](url, {
        asResponse: true,
        body: requestBody ? requestBody : undefined,
        headers: requestHeaders,
      });

      setStore((prevState) => {
        return {
          ...prevState,
          responseBody: JSON.stringify(response.body ?? '', null, 2),
          responseStatus: response.response?.status ?? 0,
          responseStatusText: response.response?.statusText ?? '',
        };
      });
    } catch (err) {
      // TODO:PT handle errors
      window.console.log(err);
    } finally {
      setStore((prevState) => {
        return {
          ...prevState,
          loading: false,
        };
      });
    }
  }, [http, httpVerb, requestBody, requestHeaders, setStore, url]);
};
