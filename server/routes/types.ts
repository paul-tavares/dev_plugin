import type { RequestHandlerContextBase, RequestHandler } from '@kbn/core-http-server';

export type DevPluginApiRouteHandler<P = unknown, Q = unknown, B = unknown> = RequestHandler<
  P,
  Q,
  B,
  RequestHandlerContextBase
>;
