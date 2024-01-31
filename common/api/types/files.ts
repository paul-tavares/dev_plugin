import { DevPluginApiListResponse } from './common';

export interface UploadedFile {
  name: string;
}

export type FilesListApiResponse = DevPluginApiListResponse<UploadedFile[]>;
