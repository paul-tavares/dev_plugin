import './index.scss';

import { DevPluginPlugin } from './plugin';

// This exports static code and TypeScript types,
// as well as, Kibana Platform `plugin()` initializer.
export function plugin() {
  return new DevPluginPlugin();
}
export type { DevPluginPluginSetup, DevPluginPluginStart } from './types';
