import { schema, TypeOf } from '@kbn/config-schema';
import { DeepMutable } from '@kbn/security-solution-plugin/common/endpoint/types';

export const FilesListApiRequest = {
  query: schema.object({
    index: schema.string({ minLength: 1 }),
  }),
};

export type FilesListApiRequestQueryParams = DeepMutable<TypeOf<typeof FilesListApiRequest.query>>;
