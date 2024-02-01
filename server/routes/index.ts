import { IRouter } from '@kbn/core/server';
import {
  API_FILE_LIST_ROUTE,
  API_INFO_ROUTE,
  API_FILE_DOWNLOAD_ROUTE,
} from '../../common/api/constants';
import { getInfoRouteHandler } from './handlers/info';
import { getFileDownloadRouteHandler } from './handlers/file_download';
import { FilesDownloadApiRequest, FilesListApiRequest } from '../../common/api/schemas/files';
import { getFileListRouteHandler } from './handlers/file_list';

export function registerApiRoutes(router: IRouter) {
  router.get(
    {
      path: API_INFO_ROUTE,
      validate: false,
    },
    getInfoRouteHandler()
  );

  router.get(
    {
      path: API_FILE_LIST_ROUTE,
      validate: FilesListApiRequest,
    },
    getFileListRouteHandler()
  );
  router.get(
    {
      path: API_FILE_DOWNLOAD_ROUTE,
      validate: FilesDownloadApiRequest,
    },
    getFileDownloadRouteHandler()
  );
}
