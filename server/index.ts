import { PluginInitializerContext } from '@kbn/core/server';
import { DevPluginPlugin } from './plugin';

//  This exports static code and TypeScript types,
//  as well as, Kibana Platform `plugin()` initializer.

export function plugin(initializerContext: PluginInitializerContext) {
  return new DevPluginPlugin(initializerContext);
}

export type { DevPluginPluginSetup, DevPluginPluginStart } from './types';
