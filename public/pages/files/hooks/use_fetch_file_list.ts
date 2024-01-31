import { useQuery, UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { IHttpFetchError } from '@kbn/core-http-browser';
import { useKibanaServices } from '../../../hooks/use_kibana_services';
import { FilesListApiResponse } from '../../../../common/api/types/files';
import { API_FILE_LIST_ROUTE } from '../../../../common/api/constants';

export const useFetchFileList = (
  options: UseQueryOptions<FilesListApiResponse, IHttpFetchError> = {}
): UseQueryResult<FilesListApiResponse, FilesListApiResponse, IHttpFetchError> => {
  const { http } = useKibanaServices();

  return useQuery<IHttpFetchError>({
    queryKey: ['fetch-files-list'],
    ...options,
    queryFn: () => {
      return http.get<FilesListApiResponse>(API_FILE_LIST_ROUTE);
    },
  });
};
