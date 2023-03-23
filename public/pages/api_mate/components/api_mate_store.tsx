import React, { memo, useState, useContext, useMemo } from 'react';
import { ApiMateState } from '../types';

interface ApiMateStoreContent {
  state: ApiMateState;
  setState: React.Dispatch<React.SetStateAction<ApiMateState>>;
}

const ApiMateStoreContext = React.createContext<ApiMateStoreContent>({} as ApiMateStoreContent);

const createState = (): ApiMateState => {
  return {
    url: '',
    httpVerb: 'get',
    response: undefined,
  };
};

export const ApiMateStore = memo(({ children }) => {
  const [state, setState] = useState<ApiMateState>(createState);

  const store = useMemo<ApiMateStoreContent>(() => {
    return {
      state,
      setState,
    };
  }, [state]);

  return <ApiMateStoreContext.Provider value={store}>{children}</ApiMateStoreContext.Provider>;
});
ApiMateStore.displayName = 'ApiMateStore';

export const useApiMateState = (): [
  ApiMateStoreContent['state'],
  ApiMateStoreContent['setState']
] => {
  const store = useContext(ApiMateStoreContext);

  if (!store) {
    throw new Error(`ApiMateStoreContext not found!`);
  }

  return [store.state, store.setState];
};
