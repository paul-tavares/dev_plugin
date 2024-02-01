import { Logger, LoggerFactory } from '@kbn/core/server';

interface DevPluginServerRuntimeStartOptions {
  logFactory: LoggerFactory;
}

export class DevPluginServerRuntime {
  constructor() {
    throw new Error(
      `DevPluginServerRuntime can not be instanced. Its a singleton mean to be used via class level static methods`
    );
  }

  private static setupOptions: DevPluginServerRuntimeStartOptions | undefined = undefined;

  private static throwSetupError(): never {
    throw new Error(`setup() has not been called on DevPluginServerRuntime`);
  }

  static setup(options: DevPluginServerRuntimeStartOptions) {
    this.setupOptions = options;
  }

  static start() {}

  static stop() {
    this.setupOptions = undefined;
  }

  static getLogger(...contextParts: Parameters<LoggerFactory['get']>): Logger {
    if (!this.setupOptions?.logFactory) {
      this.throwSetupError();
    }

    return this.setupOptions.logFactory.get(...contextParts);
  }
}
