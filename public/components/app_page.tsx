import React, { memo, PropsWithChildren } from 'react';
import { EuiPageTemplate } from '@elastic/eui';
import { EuiPageHeaderProps } from '@elastic/eui/src/components/page/page_header/page_header';

export type AppPage = PropsWithChildren<
  Pick<EuiPageHeaderProps, 'pageTitle' | 'description'> & {
    sidebar?: React.ReactNode;
  }
>;

export const AppPage = memo<AppPage>(({ pageTitle, description, sidebar, children }) => {
  return (
    <EuiPageTemplate
      panelled={false}
      bottomBorder={true}
      restrictWidth={false}
      offset={0}
      paddingSize="s"
    >
      {sidebar && <EuiPageTemplate.Sidebar sticky={true}>{sidebar}</EuiPageTemplate.Sidebar>}

      {(pageTitle || description) && (
        <EuiPageTemplate.Header pageTitle={pageTitle} description={description} />
      )}

      <EuiPageTemplate.Section>{children}</EuiPageTemplate.Section>
    </EuiPageTemplate>
  );
});
AppPage.displayName = 'AppPage';
