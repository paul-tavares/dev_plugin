import React, { memo, useCallback, useMemo, useState, useContext, useEffect } from 'react';
import { cloneDeep } from 'lodash';
import { Storage } from '@kbn/kibana-utils-plugin/public';
import { ApiMateHistoryItem } from '../types';

const DATA_VERSION = 3;
const MAX_HISTORY_ITEMS = 200;
const STORAGE = new Storage(window.localStorage);

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
    ({ requestBody, destination, requestHeaders, requestParams, url, httpVerb, wasSuccess }) => {
      setItems((prevState) => {
        const newHistoryStorage: HistoryStorage = {
          version: DATA_VERSION,
          items: [
            cloneDeep({
              created: new Date().toISOString(),
              destination,
              requestBody,
              requestHeaders,
              requestParams,
              url,
              httpVerb,
              wasSuccess,
            }),
            ...prevState.slice(0, MAX_HISTORY_ITEMS - 1),
          ],
        };

        STORAGE.set(storageKey, newHistoryStorage);

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
    const storedHistory = STORAGE.get(storageKey) as HistoryStorage | undefined;
    let dataItems = storedHistory?.items ?? [];

    // Perform history Data migration if needed
    if (storedHistory && dataItems.length) {
      let dataVersion = storedHistory.version;

      // =======================================================================
      // V2:
      //  - added new data structure for `requestParams` and `requestHeaders`
      if (dataVersion < 2) {
        dataVersion = 2;
        dataItems = storedHistory.items.map((historyEntry) => {
          return {
            ...historyEntry,
            requestParams: Object.entries(
              historyEntry.requestParams as unknown as Record<string, string>
            ).map(([key, value]) => {
              return {
                name: key,
                value,
                id: key,
              };
            }),
            requestHeaders: Object.entries(
              historyEntry.requestHeaders as unknown as Record<string, string>
            ).map(([key, value]) => {
              return {
                name: key,
                value,
                id: key,
              };
            }),
          };
        });
      }

      // =======================================================================
      // V3
      //  - Added `destination` to capture where the API call was sent
      if (dataVersion < 3) {
        dataVersion = 3;
        dataItems = storedHistory.items.map((historyEntry) => {
          return {
            ...historyEntry,
            destination: 'kibana',
          };
        });
      }
    }

    setItems(dataItems);
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
