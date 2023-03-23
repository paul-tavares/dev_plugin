import { EuiSpacer, EuiProgress } from '@elastic/eui';
import React, { memo } from 'react';
import { AppPage } from '../../../../components/app_page';
import { RequestUrl } from './components/request_url';
import { ResponseOutput } from './components/response_output';
import { useApiMateState } from '../../components/api_mate_store';

export const ApiMatePage = memo(() => {
  const [{ loading }] = useApiMateState();

  return (
    <AppPage pageTitle="API Mate" description="Send request to Kibana APIs" headerIcon="cluster">
      <RequestUrl />

      <EuiSpacer />

      <div style={{ position: 'relative' }}>
        {loading && <EuiProgress position="absolute" size="xs" color="accent" />}

        <ResponseOutput />
      </div>
    </AppPage>
  );
});
ApiMatePage.displayName = 'ApiMatePage';
