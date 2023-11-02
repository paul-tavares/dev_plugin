import React from 'react';
import { I18nProvider } from '@kbn/i18n-react';
import { Router } from 'react-router-dom';
import { KibanaContextProvider } from '@kbn/kibana-react-plugin/public';

import { CoreStart, ScopedHistory } from '@kbn/core/public';

import { AppRoutes } from './app_routes';
import { PLUGIN_NAME } from '../../common';
import { AppPluginStartDependencies } from '../types';

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
      <I18nProvider>
        <Router history={history}>
          <AppRoutes />
        </Router>
      </I18nProvider>
    </KibanaContextProvider>
  );
};
