import React, { memo } from 'react';
import { Switch } from 'react-router-dom';
import { Route } from '@kbn/shared-ux-router';
import { HomePage } from '../pages/home';
import { PageNotFound } from './page_not_found';
import { ROUTER_PATH_API_MATE_MAIN_PAGE } from '../pages/api_mate/common/constants';
import { ApiMateApp } from '../pages/api_mate';
import { FilesApp } from '../pages/files/files_app';
import { ROUTER_PATH_FILES_LIST_PAGE } from '../pages/files/common/constants';

export const AppRoutes = memo(() => {
  return (
    <Switch>
      <Route path="/" exact component={HomePage} />

      <Route path={ROUTER_PATH_API_MATE_MAIN_PAGE} component={ApiMateApp} />

      <Route path={ROUTER_PATH_FILES_LIST_PAGE} component={FilesApp} />

      <Route path="*" component={PageNotFound} />
    </Switch>
  );
});
AppRoutes.displayName = 'AppRoutes';
