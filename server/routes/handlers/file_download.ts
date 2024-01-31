import { DevPluginApiRouteHandler } from '../types';

export const getFileDownloadRouteHandler = (): DevPluginApiRouteHandler => {
  return async (context, request, response) => {
    return response.noContent({ body: { message: 'not implemented' } });
  };
};
