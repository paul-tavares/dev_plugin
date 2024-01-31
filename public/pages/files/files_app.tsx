import React, { memo } from 'react';
import { Switch } from 'react-router-dom';
import { Route } from '@kbn/shared-ux-router';
import { PageNotFound } from '../../components/page_not_found';
import { ROUTER_PATH_FILES_LIST_PAGE } from './common/constants';
import { FilesListPage } from './views/list_page/list_page';

export const FilesApp = memo((props) => {
  return (
    <Switch>
      <Route path={ROUTER_PATH_FILES_LIST_PAGE} exact component={FilesListPage} />

      <Route path="*" component={PageNotFound} />
    </Switch>
  );
});
FilesApp.displayName = 'FilesApp';
