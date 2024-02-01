import { createEsFileClient } from '@kbn/files-plugin/server';
import { DevPluginApiRouteHandler } from '../types';
import { FilesDownloadApiRequestRouteParams } from '../../../common/api/schemas/files';
import { DevPluginServerRuntime } from '../../services/runtime';

export const getFileDownloadRouteHandler =
  (): DevPluginApiRouteHandler<FilesDownloadApiRequestRouteParams> => {
    return async (context, request, response) => {
      const logger = DevPluginServerRuntime.getLogger('fileDownload');
      const { client: es } = (await context.core).elasticsearch;
      const esClient = es.asInternalUser;
      const { fileId, metaIndex, dataIndex } = request.params;

      logger.info(`Downloading file:
  meta index: ${metaIndex},
  data index: ${dataIndex},
  file id: ${fileId}
`);

      const esFileClient = createEsFileClient({
        metadataIndex: metaIndex,
        blobStorageIndex: dataIndex,
        elasticsearchClient: esClient,
        logger,
        indexIsAlias: true, // FIXME:PT should not assume here, but for now it works for our needs
        maxSizeBytes: 104857600, // 100mb
      });

      const fileRecord = await esFileClient.get({ id: fileId });
      const { name: fileName } = fileRecord.data;

      return response.ok({
        body: await fileRecord.downloadContent(),
        headers: {
          'content-type': 'application/octet-stream',
          'cache-control': 'max-age=31536000, immutable',
          // Note, this name can be overridden by the client if set via a "download" attribute on the HTML tag.
          'content-disposition': `attachment; filename="${fileName ?? 'download.zip'}"`,
          // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
          'x-content-type-options': 'nosniff',
        },
      });
    };
  };
