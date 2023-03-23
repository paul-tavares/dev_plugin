import React, { memo } from 'react';
import { AppPage } from '../../../components/app_page';

export interface ApiMatePageProps {
  // TODO: define props
}

export const ApiMatePage = memo<ApiMatePageProps>((props) => {
  return (
    <AppPage pageTitle="API Mate" description="Send request to Kibana APIs">
      {'ApiMatePage placeholder'}
    </AppPage>
  );
});
ApiMatePage.displayName = 'ApiMatePage';
