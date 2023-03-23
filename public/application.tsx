import React from 'react';
import ReactDOM from 'react-dom';
import { AppMountParameters, CoreStart } from '@kbn/core/public';
import { AppPluginStartDependencies } from './types';
import { DevPluginApp } from './components/app';

export const renderApp = (
  coreStart: CoreStart,
  startDependencies: AppPluginStartDependencies,
  { appBasePath, element, history }: AppMountParameters
) => {
  ReactDOM.render(
    <DevPluginApp
      appBasePath={appBasePath}
      history={history}
      coreStart={coreStart}
      startDependencies={startDependencies}
    />,
    element
  );

  return () => ReactDOM.unmountComponentAtNode(element);
};
