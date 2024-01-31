import React, { memo, useMemo } from 'react';
import { getFileMetadataIndexName } from '@kbn/fleet-plugin/common';
import { EuiBasicTable } from '@elastic/eui';
import { EuiBasicTableColumn } from '@elastic/eui/src/components/basic_table/basic_table';
import { AppPage } from '../../../../components/app_page';
import { useFetchFileList } from '../../hooks/use_fetch_file_list';

export const FilesListPage = memo((props) => {
  const index = getFileMetadataIndexName('endpoint', true);
  const api = useFetchFileList({ index: index ?? '' }, { enabled: !!index });

  const columns: Array<EuiBasicTableColumn<any>> = useMemo(() => {
    return [
      {
        field: 'data',
        name: 'Data',
        render: (_, record) => {
          return JSON.stringify(record ?? {});
        },
      },
    ];
  }, []);

  return (
    <AppPage
      pageTitle="Files"
      description="View files uploaded to Elasticsearch using the kibana core Files plugin"
      headerIcon="cluster"
    >
      <div>{index ? index : 'No index defined'}</div>
      <div>
        <EuiBasicTable items={api.data?.data ?? []} columns={columns} />
      </div>
    </AppPage>
  );
});
FilesListPage.displayName = 'FilesListPage';
