import React, { memo, useCallback, useMemo, useState, useContext, useEffect } from 'react';
import { clone } from 'lodash';
import { Storage } from '@kbn/kibana-utils-plugin/public';
import { ApiMateHistoryItem } from '../types';

const DATA_VERSION = 1;

const storage = new Storage(window.localStorage);

const ApiMateHistoryContext = React.createContext<ApiMateHistoryInterface>(
  {} as ApiMateHistoryInterface
);

interface HistoryStorage {
  version: number;
  items: ApiMateHistoryItem[];
}

export const ApiMateHistory = memo(({ children }) => {
  const storageKey = 'dev_plugin.apiMate.history';
  const [items, setItems] = useState<ApiMateHistoryItem[]>([]);

  const add: ApiMateHistoryInterface['add'] = useCallback(
    ({
      requestBody,
      requestHeaders,
      requestParams,
      responseBody,
      responseStatus,
      responseStatusText,
      url,
      httpVerb,
    }) => {
      setItems((prevState) => {
        const newHistoryStorage: HistoryStorage = {
          version: DATA_VERSION,
          items: [
            clone({
              created: new Date().toISOString(),
              requestBody,
              requestHeaders,
              requestParams,
              responseBody,
              responseStatus,
              responseStatusText,
              url,
              httpVerb,
            }),
            ...prevState,
          ],
        };

        storage.set(storageKey, newHistoryStorage);

        return newHistoryStorage.items;
      });
    },
    []
  );

  const historyInterface = useMemo<ApiMateHistoryInterface>(() => {
    return {
      items,
      add,
    };
  }, [add, items]);

  useEffect(() => {
    setItems((storage.get(storageKey) as HistoryStorage | undefined)?.items ?? []);

    // !!
    // FUTURE: if we need to migrate the data, we can do it here
    // !!
  }, []);

  return (
    <ApiMateHistoryContext.Provider value={historyInterface}>
      {children}
    </ApiMateHistoryContext.Provider>
  );
});
ApiMateHistory.displayName = 'ApiMateHistory';

export interface ApiMateHistoryInterface {
  items: ApiMateHistoryItem[];
  add: (item: Omit<ApiMateHistoryItem, 'created'>) => void;
}

export const useApiMateHistory = (): ApiMateHistoryInterface => {
  return useContext(ApiMateHistoryContext);
};
