import type { ToolingLog } from '@kbn/tooling-log';

export interface StartRuntimeServicesOptions {
  kibanaUrl: string;
  elasticUrl: string;
  username: string;
  password: string;
  version?: string;
  policy?: string;
  log?: ToolingLog;
  asSuperuser?: boolean;
}
