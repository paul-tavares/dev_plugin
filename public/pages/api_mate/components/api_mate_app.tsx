import React, { memo } from 'react';
import { ApiMateRoutes } from './api_mate_routes';
import { ApiMateStore } from './api_mate_store';

export interface ApiMateAppProps {
  // TODO: define props
}

export const ApiMateApp = memo<ApiMateAppProps>((props) => {
  return (
    <ApiMateStore>
      <ApiMateRoutes />
    </ApiMateStore>
  );
});
ApiMateApp.displayName = 'ApiMateApp';
