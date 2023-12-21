import React, { memo } from 'react';
import { EuiFlexItem, EuiFlexGroup, EuiSpacer } from '@elastic/eui';
import styled from 'styled-components';
import { AppPage } from '../../../components/app_page';
import { ApiMateCard } from '../../api_mate';

const CardContainer = styled.div`
  width: 25%;
  min-width: 350px;
`;

export const HomePage = memo(() => {
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
