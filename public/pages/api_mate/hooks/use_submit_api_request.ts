import { useCallback } from 'react';
import { useKibanaServices } from '../../../hooks/use_kibana_services';
import { useApiMateState } from '../components/api_mate_store';

export const useSubmitApiRequest = (): (() => Promise<void>) => {
  const { http } = useKibanaServices();
  const [{ url }, setStore] = useApiMateState();

  return useCallback(async () => {
    // TODO: do validation on data needed

    try {
      const response = await http.get(url, { asResponse: true });
      setStore((prevState) => {
        return {
          ...prevState,
          response,
        };
      });
    } catch (err) {
      // TODO:PT handle errors
      window.console.log(err);
    }
  }, [http, setStore, url]);
};
