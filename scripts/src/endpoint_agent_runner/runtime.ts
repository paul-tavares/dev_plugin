import { ToolingLog } from '@kbn/tooling-log';
import { getAgentVersionMatchingCurrentStack } from '@kbn/security-solution-plugin/scripts/endpoint/common/fleet_services';
import type { RuntimeServices } from '@kbn/security-solution-plugin/scripts/endpoint/common/stack_services';
import { createRuntimeServices } from '@kbn/security-solution-plugin/scripts/endpoint/common/stack_services';
import type { StartRuntimeServicesOptions } from './types';

interface EndpointRunnerRuntimeServices extends RuntimeServices {
  options: Omit<
    StartRuntimeServicesOptions,
    'kibanaUrl' | 'elasticUrl' | 'username' | 'password' | 'log'
  >;
}

// Internal singleton storing the services for the current run
let runtimeServices: undefined | EndpointRunnerRuntimeServices;

export const startRuntimeServices = async ({
  log = new ToolingLog(),
  elasticUrl,
  kibanaUrl,
  fleetServerUrl,
  username,
  password,
  ...otherOptions
}: StartRuntimeServicesOptions) => {
  const stackServices = await createRuntimeServices({
    kibanaUrl,
    elasticsearchUrl: elasticUrl,
    fleetServerUrl,
    username,
    password,
    log,
    asSuperuser: otherOptions?.asSuperuser,
  });

  runtimeServices = {
    ...stackServices,
    options: {
      ...otherOptions,

      version:
        otherOptions.version ||
        (await getAgentVersionMatchingCurrentStack(stackServices.kbnClient)),
    },
  };
};

export const stopRuntimeServices = async () => {
  runtimeServices = undefined;
};

export const getRuntimeServices = () => {
  if (!runtimeServices) {
    throw new Error(`Runtime services have not be initialized yet!`);
  }

  return runtimeServices;
};
