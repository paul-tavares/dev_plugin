import React, { memo } from 'react';
import { AppPage } from './app_page';

export const PageNotFound = memo(() => {
  return <AppPage>{'PageNotFound placeholder'}</AppPage>;
});
PageNotFound.displayName = 'PageNotFound';
