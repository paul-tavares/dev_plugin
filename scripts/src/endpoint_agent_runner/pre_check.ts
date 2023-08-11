import execa from 'execa';
import { getRuntimeServices } from './runtime';

export const checkDependencies = async () => {
  const { log } = getRuntimeServices();

  log.info(`Checking dependencies`);

  // TODO:PT validate that ES / KBN is reachable

  await Promise.all([checkDocker(), checkVmRunner()]);
};

const checkDocker = async () => {
  const { log } = getRuntimeServices();

  try {
    const dockerVersion = await execa('docker', ['--version']);

    log.verbose(`Using docker: ${dockerVersion.stdout}`);
  } catch (err) {
    log.verbose(err);
    throw new Error(
      `Docker not found on local machine [${err.message}]. Install it from: https://www.docker.com\n\n`
    );
  }
};

const checkVmRunner = async () => {
  const { log } = getRuntimeServices();

  try {
    const version = await execa('multipass', ['--version']);

    log.verbose(`Using 'multipass': ${version.stdout}`);
  } catch (err) {
    log.verbose(err);
    throw new Error(
      `Mutipass not found on local machine [${err.message}]. Install it from: https://multipass.run\n\n`
    );
  }
};
