import { ElasticsearchClient } from '@kbn/core-elasticsearch-server';
import { SearchTotalHits } from '@elastic/elasticsearch/lib/api/types';
import { DevPluginApiRouteHandler } from '../types';
import { FilesListApiResponse } from '../../../common/api/types/files';
import { FilesListApiRequestQueryParams } from '../../../common/api/schemas/files';

export const getFileListRouteHandler = (): DevPluginApiRouteHandler<
  never,
  FilesListApiRequestQueryParams
> => {
  return async (context, request, response) => {
    const { client: es } = (await context.core).elasticsearch;
    const esClient = es.asCurrentUser;
    const index = request.query.index;

    return response.ok({
      body: await fetchFileMetaList({ esClient, index }),
    });
  };
};

const fetchFileMetaList = async ({
  esClient,
  index,
}: {
  esClient: ElasticsearchClient;
  index: string;
}): Promise<FilesListApiResponse> => {
  if (!index.trim()) {
    throw new Error(`index must be defined`);
  }

  const response = await esClient.search({
    index,
    size: 1000,
  });

  return {
    data: response.hits.hits,
    total: (response.hits.total as SearchTotalHits).value,
    page: 1,
    perPage: 1000,
  };
};
