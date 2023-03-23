import React, { memo } from 'react';
import { EuiFlexItem, EuiFlexGroup } from '@elastic/eui';
import { AppPage } from '../../../components/app_page';
import { ApiMateCard } from '../../api_mate';

export interface HomePageProps {
  // TODO: define props
}

export const HomePage = memo<HomePageProps>((props) => {
  return (
    <AppPage
      pageTitle="Endpoint Developer Tools"
      description="Various web based tools to help in development"
    >
      <EuiFlexGroup wrap>
        <EuiFlexItem>
          <ApiMateCard />
        </EuiFlexItem>
      </EuiFlexGroup>
    </AppPage>
  );
});
HomePage.displayName = 'HomePage';
