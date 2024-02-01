import React, { memo, useMemo } from 'react';
import { getFileMetadataIndexName, getFileDataIndexName } from '@kbn/fleet-plugin/common';
import { EuiBasicTable, EuiButton, EuiCodeBlock } from '@elastic/eui';
import { EuiBasicTableColumn } from '@elastic/eui/src/components/basic_table/basic_table';
import { AppPage } from '../../../../components/app_page';
import { useFetchFileList } from '../../hooks/use_fetch_file_list';
import { API_FILE_DOWNLOAD_ROUTE } from '../../../../../common/api/constants';
import { resolvePathVariables } from '../../../../../common/utils/resolve_path_variables';

export const FilesListPage = memo((props) => {
  const index = getFileMetadataIndexName('endpoint', true);
  const dataIndex = getFileDataIndexName('endpoint', true);
  const api = useFetchFileList({ index: index ?? '' }, { enabled: !!index });

  const columns: Array<EuiBasicTableColumn<any>> = useMemo(() => {
    return [
      {
        field: 'data',
        name: 'Data',
        width: '85%',
        render: (_, record) => {
          return (
            <EuiCodeBlock language="json">{JSON.stringify(record ?? {}, null, 2)}</EuiCodeBlock>
          );
        },
      },
      {
        field: 'download',
        name: 'Download',
        render: (_, record) => {
          const downloadUrl = resolvePathVariables(API_FILE_DOWNLOAD_ROUTE, {
            metaIndex: index,
            dataIndex,
            fileId: record._id,
          });
          return (
            <EuiButton href={downloadUrl} iconType="download" download={record._source.file.name}>
              {'Download'}
            </EuiButton>
          );
        },
      },
    ];
  }, [index]);

  return (
    <AppPage
      pageTitle="Files"
      description="View files uploaded to Elasticsearch using the kibana core Files plugin"
      headerIcon="cluster"
    >
      <div>{index ? `${index}, ${dataIndex}` : 'No index defined'}</div>
      <div>
        <EuiBasicTable items={api.data?.data ?? []} columns={columns} />
      </div>
    </AppPage>
  );
});
FilesListPage.displayName = 'FilesListPage';
