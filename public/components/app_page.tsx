import React, { memo, PropsWithChildren } from 'react';
import { EuiPageTemplate } from '@elastic/eui';
import { EuiPageHeaderProps } from '@elastic/eui/src/components/page/page_header/page_header';

export type AppPage = PropsWithChildren<
  Pick<EuiPageHeaderProps, 'pageTitle' | 'description'> & {
    sidebar?: React.ReactNode;
    headerIcon?: EuiPageHeaderProps['iconType'];
  }
>;

export const AppPage = memo<AppPage>(
  ({ pageTitle, description, sidebar, headerIcon, children }) => {
    return (
      <EuiPageTemplate
        panelled={false}
        bottomBorder={true}
        restrictWidth={false}
        offset={0}
        paddingSize="none"
      >
        {sidebar && <EuiPageTemplate.Sidebar sticky={true}>{sidebar}</EuiPageTemplate.Sidebar>}

        {(pageTitle || description) && (
          <EuiPageTemplate.Header
            pageTitle={pageTitle}
            description={description}
            iconType={headerIcon}
            paddingSize="l"
          />
        )}

        <EuiPageTemplate.Section paddingSize="l">{children}</EuiPageTemplate.Section>
      </EuiPageTemplate>
    );
  }
);
AppPage.displayName = 'AppPage';
