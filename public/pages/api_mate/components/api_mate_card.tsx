import React, { memo } from 'react';
import { EuiCard, EuiIcon } from '@elastic/eui';
import { useApiMateUrlRoute } from '../hooks/use_api_mate_url_route';

export interface ApiMateCardProps {
  // TODO: define props
}

export const ApiMateCard = memo<ApiMateCardProps>((props) => {
  const [mainPageHref, onClickHandler] = useApiMateUrlRoute({ page: 'main' });

  return (
    <EuiCard
      layout="horizontal"
      icon={<EuiIcon type="cluster" size="l" />}
      title="API Mate"
      description="Issue API requests against the Kibana APIs"
      onClick={onClickHandler}
      href={mainPageHref}
    />
  );
});
ApiMateCard.displayName = 'ApiMateCard';
