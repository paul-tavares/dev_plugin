import React, { memo } from 'react';
import { EuiFlexItem, EuiFlexGroup, EuiSpacer } from '@elastic/eui';
import styled from 'styled-components';
import { AppPage } from '../../../components/app_page';
import { ApiMateCard } from '../../api_mate';

const CardContainer = styled.div`
  width: 25%;
  min-width: 350px;
`;

export interface HomePageProps {
  // TODO: define props
}

export const HomePage = memo<HomePageProps>((props) => {
  return (
    <AppPage
      pageTitle="Developer Tools"
      description="Various web based tools to help in development"
    >
      <EuiSpacer size="xl" />
      <EuiFlexGroup wrap>
        <EuiFlexItem>
          <CardContainer>
            <ApiMateCard />
          </CardContainer>
        </EuiFlexItem>
      </EuiFlexGroup>
    </AppPage>
  );
});
HomePage.displayName = 'HomePage';
