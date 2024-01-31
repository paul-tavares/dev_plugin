import { DevPluginApiRouteHandler } from '../types';

export const getFileListRouteHandler = (): DevPluginApiRouteHandler => {
  return async (constext, request, response) => {
    return response.noContent({ body: { message: 'not implemented' } });
  };
};
