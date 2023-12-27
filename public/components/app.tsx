import React from 'react';
import { I18nProvider } from '@kbn/i18n-react';
import { Router } from '@kbn/shared-ux-router';
import { KibanaContextProvider } from '@kbn/kibana-react-plugin/public';

import { CoreStart, ScopedHistory } from '@kbn/core/public';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { AppRoutes } from './app_routes';
import { PLUGIN_NAME } from '../../common';
import { AppPluginStartDependencies } from '../types';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      keepPreviousData: true,
    },
  },
});

interface DevPluginAppDeps {
  appBasePath: string;
  coreStart: CoreStart;
  startDependencies: AppPluginStartDependencies;
  history: ScopedHistory;
}

export const DevPluginApp = ({
  appBasePath,
  startDependencies,
  coreStart,
  history,
}: DevPluginAppDeps) => {
  return (
    <KibanaContextProvider
      services={{
        appName: PLUGIN_NAME,
        startDependencies,
        appBasePath,
        ...coreStart,
      }}
    >
      <QueryClientProvider client={queryClient}>
        <I18nProvider>
          <Router history={history}>
            <AppRoutes />
          </Router>
        </I18nProvider>
      </QueryClientProvider>
    </KibanaContextProvider>
  );
};
