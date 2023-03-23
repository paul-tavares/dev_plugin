import React, { memo, PropsWithChildren, ReactNode, useMemo } from 'react';
import {
  EuiPage,
  EuiPageBody,
  EuiPageHeader,
  EuiTitle,
  EuiPageContent_Deprecated as EuiPageContent,
  EuiPageContentBody_Deprecated as EuiPageContentBody,
  EuiPageContentHeader_Deprecated as EuiPageContentHeader,
} from '@elastic/eui';

export type AppPage = PropsWithChildren<{
  title?: ReactNode;
  subTitle?: ReactNode;
}>;

export const AppPage = memo<AppPage>(({ title = '', subTitle = '', children }) => {
  const pageTitle = useMemo(() => {
    return <>{typeof title === 'string' ? <h1>{title}</h1> : title}</>;
  }, [title]);

  const pageSubTitle = useMemo(() => {
    return <>{typeof subTitle === 'string' ? <h2>{subTitle}</h2> : subTitle}</>;
  }, [subTitle]);

  return (
    <EuiPage>
      <EuiPageBody>
        {title && (
          <EuiPageHeader>
            <EuiTitle size="l">{pageTitle}</EuiTitle>
          </EuiPageHeader>
        )}
        <EuiPageContent>
          {subTitle && (
            <EuiPageContentHeader>
              <EuiTitle>{pageSubTitle}</EuiTitle>
            </EuiPageContentHeader>
          )}
          <EuiPageContentBody>{children}</EuiPageContentBody>
        </EuiPageContent>
      </EuiPageBody>
    </EuiPage>
  );
});
AppPage.displayName = 'AppPage';
