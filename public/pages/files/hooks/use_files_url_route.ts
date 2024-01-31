import { useMemo } from 'react';
import { PLUGIN_ID } from '../../../../common';
import { useKibanaServices } from '../../../hooks/use_kibana_services';
import { ROUTER_PATH_FILES_LIST_PAGE } from '../common/constants';

interface FilesUrlRouteOptions {
  page: 'list';
  options?: never;
}

export const useFilesUrlRoute = ({
  page,
  options,
}: FilesUrlRouteOptions): [string, React.MouseEventHandler] => {
  const {
    application: { getUrlForApp, navigateToApp },
  } = useKibanaServices();

  return useMemo(() => {
    let path = `${page}-invalid`;

    switch (page) {
      case 'list':
        path = ROUTER_PATH_FILES_LIST_PAGE;
        break;
    }

    const navigateHandler: React.MouseEventHandler = (ev) => {
      if (ev.defaultPrevented) {
        return;
      }

      if (ev.button !== 0) {
        return;
      }

      if (
        ev.currentTarget instanceof HTMLAnchorElement &&
        ev.currentTarget.target !== '' &&
        ev.currentTarget.target !== '_self'
      ) {
        return;
      }

      if (ev.metaKey || ev.altKey || ev.ctrlKey || ev.shiftKey) {
        return;
      }

      ev.preventDefault();
      navigateToApp(PLUGIN_ID, { path });
    };

    return [getUrlForApp(PLUGIN_ID, { path }), navigateHandler];
  }, [getUrlForApp, navigateToApp, page]);
};
