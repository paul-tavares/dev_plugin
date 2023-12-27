import React, { memo, PropsWithChildren, useMemo } from 'react';
import { EuiFlexGroup, EuiIcon, EuiPageTemplate, EuiText } from '@elastic/eui';
import { EuiPageHeaderProps } from '@elastic/eui/src/components/page/page_header/page_header';
import { useQuery } from '@tanstack/react-query';
import { useKibanaServices } from '../hooks/use_kibana_services';
import { API_INFO_ROUTE } from '../../common/api/constants';
import { ProjectInfoApiResponse } from '../../common/api/types/info_route';

export type AppPage = PropsWithChildren<
  Pick<EuiPageHeaderProps, 'pageTitle' | 'description'> & {
    sidebar?: React.ReactNode;
    headerIcon?: EuiPageHeaderProps['iconType'];
  }
>;

export const AppPage = memo<AppPage>(
  ({ pageTitle, description, sidebar, headerIcon, children }) => {
    const { http } = useKibanaServices();
    const { data } = useQuery({
      queryKey: ['get-project-info'],
      queryFn: () => {
        return http.get<ProjectInfoApiResponse>(API_INFO_ROUTE);
      },
    });

    const updateExists = useMemo(() => {
      if (!data) {
        return false;
      }

      const { currentCommitHash, latestCommitHash } = data.data;

      return !!(latestCommitHash && currentCommitHash !== latestCommitHash);
    }, [data]);

    return (
      <EuiPageTemplate
        panelled={false}
        bottomBorder={true}
        restrictWidth={false}
        offset={0}
        paddingSize="none"
      >
        {updateExists && (
          <EuiPageTemplate.Section
            color="primary"
            paddingSize="s"
            grow={false}
            bottomBorder="extended"
          >
            <EuiFlexGroup
              wrap={false}
              responsive={false}
              gutterSize="none"
              justifyContent="flexEnd"
            >
              <EuiText color="subdued" size="s">
                <EuiIcon type="iInCircle" color="primary" />
                {
                  ' There is an updated version of this plugin! Update your local copy to get the latest'
                }
              </EuiText>
            </EuiFlexGroup>
          </EuiPageTemplate.Section>
        )}

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
