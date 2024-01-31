import React, { memo } from 'react';
import { EuiCard, EuiIcon } from '@elastic/eui';
import { useFilesUrlRoute } from '../hooks/use_files_url_route';

export const FilesHomepageCard = memo(() => {
  const [listPageHref, onClickHandler] = useFilesUrlRoute({ page: 'list' });

  return (
    <EuiCard
      layout="horizontal"
      icon={<EuiIcon type="documents" size="l" />}
      title="Files"
      description="View and download files created using the Files plugin from kibana core"
      onClick={onClickHandler}
      href={listPageHref}
    />
  );
});
FilesHomepageCard.displayName = 'FilesHomepageCard';
