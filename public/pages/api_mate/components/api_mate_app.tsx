import React, { memo } from 'react';
import { ApiMateRoutes } from './api_mate_routes';
import { ApiMateStore } from './api_mate_store';
import { ApiMateHistory } from './api_mate_history';

export const ApiMateApp = memo(() => {
  return (
    <ApiMateStore>
      <ApiMateHistory>
        <ApiMateRoutes />
      </ApiMateHistory>
    </ApiMateStore>
  );
});
ApiMateApp.displayName = 'ApiMateApp';
