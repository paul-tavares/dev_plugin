import React, { memo } from 'react';
import { Switch } from 'react-router-dom';
import { Route } from '@kbn/shared-ux-router';
import { PageNotFound } from '../../../components/page_not_found';
import { ROUTER_PATH_API_MATE_MAIN_PAGE } from '../common/constants';
import { ApiMatePage } from '../views/main_page/api_mate_page';

export interface ApiMateRoutesProps {
  // TODO: define props
}

export const ApiMateRoutes = memo<ApiMateRoutesProps>((props) => {
  return (
    <Switch>
      <Route path={ROUTER_PATH_API_MATE_MAIN_PAGE} exact component={ApiMatePage} />

      <Route path="*" component={PageNotFound} />
    </Switch>
  );
});
ApiMateRoutes.displayName = 'ApiMateRoutes';
