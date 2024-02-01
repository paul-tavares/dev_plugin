import {
  PluginInitializerContext,
  CoreSetup,
  CoreStart,
  Plugin,
  Logger,
  LoggerFactory,
} from '@kbn/core/server';

import { DevPluginPluginSetup, DevPluginPluginStart } from './types';
import { registerApiRoutes } from './routes';
import { DevPluginServerRuntime } from './services/runtime';

export class DevPluginPlugin implements Plugin<DevPluginPluginSetup, DevPluginPluginStart> {
  private readonly logFactory: LoggerFactory;
  private readonly logger: Logger;

  constructor(initializerContext: PluginInitializerContext) {
    this.logFactory = initializerContext.logger;
    this.logger = initializerContext.logger.get();
  }

  public setup(core: CoreSetup) {
    this.logger.debug('devPlugin: Setup');
    const router = core.http.createRouter();

    DevPluginServerRuntime.setup({
      logFactory: this.logFactory,
    });

    // Register server side APIs
    registerApiRoutes(router);

    return {};
  }

  public start(core: CoreStart) {
    this.logger.debug('devPlugin: Started');
    return {};
  }

  public stop() {}
}
