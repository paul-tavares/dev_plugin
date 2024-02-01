import { schema, TypeOf } from '@kbn/config-schema';
import { DeepMutable } from '@kbn/security-solution-plugin/common/endpoint/types';

export const FilesListApiRequest = {
  query: schema.object({
    index: schema.string({ minLength: 1 }),
  }),
};
export type FilesListApiRequestQueryParams = DeepMutable<TypeOf<typeof FilesListApiRequest.query>>;

export const FilesDownloadApiRequest = {
  params: schema.object({
    metaIndex: schema.string({ minLength: 1 }),
    dataIndex: schema.string({ minLength: 1 }),
    fileId: schema.string({ minLength: 1 }),
  }),
};
export type FilesDownloadApiRequestRouteParams = DeepMutable<
  TypeOf<typeof FilesDownloadApiRequest.params>
>;
