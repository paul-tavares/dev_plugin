import React, { useMemo } from 'react';
import { I18nProvider } from '@kbn/i18n-react';
import { Router } from '@kbn/shared-ux-router';
import { KibanaContextProvider } from '@kbn/kibana-react-plugin/public';
import { EuiThemeProvider } from '@kbn/kibana-react-plugin/common';
import { CoreStart, ScopedHistory } from '@kbn/core/public';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { KibanaRenderContextProvider } from '@kbn/react-kibana-context-render';
import useObservable from 'react-use/lib/useObservable';
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
  const { theme: themeStart } = coreStart;
  const theme = useObservable(themeStart.theme$, themeStart.getTheme());
  const isDarkMode = theme.darkMode;

  const services = useMemo(() => {
    return {
      appName: PLUGIN_NAME,
      startDependencies,
      appBasePath,
      ...coreStart,
    };
  }, [appBasePath, coreStart, startDependencies]);

  return (
    <KibanaRenderContextProvider {...coreStart}>
      <KibanaContextProvider services={services}>
        <EuiThemeProvider darkMode={isDarkMode}>
          <QueryClientProvider client={queryClient}>
            <I18nProvider>
              <Router history={history}>
                <AppRoutes />
              </Router>
            </I18nProvider>
          </QueryClientProvider>
        </EuiThemeProvider>
      </KibanaContextProvider>
    </KibanaRenderContextProvider>
  );
};
