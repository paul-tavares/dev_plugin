import { PluginInitializerContext, CoreSetup, CoreStart, Plugin, Logger } from '@kbn/core/server';

import { DevPluginPluginSetup, DevPluginPluginStart } from './types';
import { defineRoutes } from './routes';

export class DevPluginPlugin implements Plugin<DevPluginPluginSetup, DevPluginPluginStart> {
  private readonly logger: Logger;

  constructor(initializerContext: PluginInitializerContext) {
    this.logger = initializerContext.logger.get();
  }

  public setup(core: CoreSetup) {
    this.logger.debug('devPlugin: Setup');
    const router = core.http.createRouter();

    // Register server side APIs
    defineRoutes(router);

    return {};
  }

  public start(core: CoreStart) {
    this.logger.debug('devPlugin: Started');
    return {};
  }

  public stop() {}
}
