import { DevPluginApiDetailsResponse } from './common';

export interface ProjectInfo {
  currentCommitHash: string;
  latestCommitHash: string;
  currentHasLatest: boolean;
}

export type ProjectInfoApiResponse = DevPluginApiDetailsResponse<ProjectInfo>;
