import { DevPluginApiDetailsResponse } from './common';

export interface ProjectInfo {
  currentCommitHash: string;
  latestCommitHash: string;
}

export type ProjectInfoApiResponse = DevPluginApiDetailsResponse<ProjectInfo>;
