import { useKibana } from '@kbn/kibana-react-plugin/public';
import { useMemo } from 'react';
import { ROUTER_PATH_API_MATE_MAIN_PAGE } from '../common/constants';
import { PLUGIN_ID } from '../../../../common';

interface ApiMateUrlRouteOptions {
  page: 'main';
  options?: never;
}

export const useApiMateUrlRoute = ({
  page,
  options,
}: ApiMateUrlRouteOptions): [string, React.MouseEventHandler] => {
  const {
    services: {
      application: { getUrlForApp, navigateToApp },
    },
  } = useKibana();

  return useMemo(() => {
    let path = `${page}-invalid`;

    switch (page) {
      case 'main':
        path = ROUTER_PATH_API_MATE_MAIN_PAGE;
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
