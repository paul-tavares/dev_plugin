import { EuiSpacer } from '@elastic/eui';
import React, { memo } from 'react';
import { AppPage } from '../../../../components/app_page';
import { RequestUrl } from './components/request_url';
import { ResponseOutput } from './components/response_output';

export interface ApiMatePageProps {
  // TODO: define props
}

export const ApiMatePage = memo<ApiMatePageProps>((props) => {
  return (
    <AppPage pageTitle="API Mate" description="Send request to Kibana APIs" headerIcon="cluster">
      <RequestUrl />

      <EuiSpacer />

      <ResponseOutput />
    </AppPage>
  );
});
ApiMatePage.displayName = 'ApiMatePage';
