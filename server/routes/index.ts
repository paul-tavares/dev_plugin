import { IRouter } from '@kbn/core/server';
import { API_INFO_ROUTE } from '../../common/api/constants';
import { getInfoRouteHandler } from './handlers/info';

export function registerApiRoutes(router: IRouter) {
  router.get(
    {
      path: API_INFO_ROUTE,
      validate: false,
    },
    getInfoRouteHandler()
  );
}
