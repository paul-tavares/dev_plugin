import { runFleetServerIfNeeded } from './fleet_server';
import { startRuntimeServices, stopRuntimeServices } from './runtime';
import { checkDependencies } from './pre_check';
import { enrollEndpointHost } from './elastic_endpoint';
import type { StartRuntimeServicesOptions } from './types';

export const setupAll = async (options: StartRuntimeServicesOptions) => {
  await startRuntimeServices(options);

  await checkDependencies();

  await runFleetServerIfNeeded();

  await enrollEndpointHost();

  await stopRuntimeServices();
};
