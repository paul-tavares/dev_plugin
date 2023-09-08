import { EuiSpacer, EuiProgress, EuiFlexGroup, EuiFlexItem } from '@elastic/eui';
import React, { memo } from 'react';
import { AppPage } from '../../../../components/app_page';
import { RequestUrl } from './components/request_url/request_url';

import { useApiMateState } from '../../components/api_mate_store';
import { RequestLayout } from './components/request/request_layout';
import { ResponseLayout } from './components/response/response_layout';
import { HistoryLayout } from './components/history/history_layout';

export const ApiMatePage = memo(() => {
  const [{ loading }] = useApiMateState();

  return (
    <AppPage pageTitle="API Mate" description="Send request to Kibana APIs" headerIcon="cluster">
      <RequestUrl />

      <EuiSpacer />

      <div style={{ position: 'relative' }}>
        {loading && <EuiProgress position="absolute" size="xs" color="accent" />}

        <EuiFlexGroup responsive={false}>
          <EuiFlexItem grow={false}>
            <HistoryLayout />
          </EuiFlexItem>
          <EuiFlexItem grow>
            <EuiFlexGroup responsive={false}>
              <EuiFlexItem>
                <RequestLayout />
              </EuiFlexItem>
              <EuiFlexItem>
                <ResponseLayout />
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlexItem>
        </EuiFlexGroup>
      </div>
    </AppPage>
  );
});
ApiMatePage.displayName = 'ApiMatePage';
