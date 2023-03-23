import { useCallback } from 'react';
import { useKibanaServices } from '../../../hooks/use_kibana_services';
import { useApiMateState } from '../components/api_mate_store';

export const useSubmitApiRequest = (): (() => Promise<void>) => {
  const { http } = useKibanaServices();
  const [{ url }, setStore] = useApiMateState();

  return useCallback(async () => {
    // TODO: do validation on data needed

    setStore((prevState) => {
      return {
        ...prevState,
        loading: true,
      };
    });

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
    } finally {
      setStore((prevState) => {
        return {
          ...prevState,
          loading: false,
        };
      });
    }
  }, [http, setStore, url]);
};
