import React, { memo } from 'react';
import { ApiMateRoutes } from './api_mate_routes';

export interface ApiMateAppProps {
  // TODO: define props
}

export const ApiMateApp = memo<ApiMateAppProps>((props) => {
  return <ApiMateRoutes />;
});
ApiMateApp.displayName = 'ApiMateApp';
