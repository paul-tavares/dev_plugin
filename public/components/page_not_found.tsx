import React, { memo } from 'react';
import { AppPage } from './app_page';

export interface PageNotFoundProps {
  //TODO: define props
}

export const PageNotFound = memo<PageNotFoundProps>((props) => {
  return <AppPage>{'PageNotFound placeholder'}</AppPage>;
});
PageNotFound.displayName = 'PageNotFound';
