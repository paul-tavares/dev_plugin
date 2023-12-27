import axios from 'axios';
import execa from 'execa';
import { DevPluginApiRouteHandler } from '../types';
import { ProjectInfo, ProjectInfoApiResponse } from '../../../common/api/types/info_route';

export const getInfoRouteHandler = (): DevPluginApiRouteHandler => {
  return async (context, request, response) => {
    const reponseBody: ProjectInfoApiResponse = {
      data: await DevPluginGithubProject.getInfo(),
    };

    return response.ok({
      body: reponseBody,
    });
  };
};

// TODO:PT maybe move this to a reusable module/service
class DevPluginGithubProject {
  constructor() {
    throw new Error(`class is a singleton and can not be used with 'new'. Call static methods`);
  }

  private static info:
    | {
        repo: {
          ref: string;
          node_id: string;
          url: string;
          object: {
            sha: string;
            type: string;
            url: string;
          };
        };
        currentHash: string;
      }
    | undefined = undefined;

  private static fetchedAt: string = '';

  private static readonly cacheStaleDuration: number = 1000 * 60 * 120; // 2h

  private static async fetchInfo() {
    // TODO: build URL from values in `package.json`?
    const response = await axios.get(
      'https://api.github.com/repos/paul-tavares/dev_plugin/git/refs/heads/main'
    );

    this.fetchedAt = new Date().toISOString();
    this.info = {
      repo: response.data,
      currentHash: (await execa.command('git rev-parse HEAD')).stdout,
    };
  }

  private static isInfoExpired(): boolean {
    return (
      !this.info ||
      !this.fetchedAt ||
      Date.now() - new Date(this.fetchedAt).getTime() < this.cacheStaleDuration
    );
  }

  public static async getInfo(): Promise<ProjectInfo> {
    if (this.isInfoExpired()) {
      await this.fetchInfo();
    }

    return {
      currentCommitHash: this.info?.currentHash ?? '',
      latestCommitHash: this.info?.repo.object.sha ?? '',
    };
  }
}
