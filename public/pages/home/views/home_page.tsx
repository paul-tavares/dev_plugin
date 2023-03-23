import React, { memo } from 'react';
import { AppPage } from '../../../components/app_page';
import { EuiFlexItem, EuiFlexGroup } from '@elastic/eui';
import { ApiMateCard } from '../../api_mate';

export interface HomePageProps {
  //TODO: define props
}

export const HomePage = memo<HomePageProps>((props) => {
  return (
    <AppPage title="Endpoint Developer Tools">
      <EuiFlexGroup wrap>
        <EuiFlexItem>
          <ApiMateCard />
        </EuiFlexItem>
      </EuiFlexGroup>
    </AppPage>
  );
});
HomePage.displayName = 'HomePage';
