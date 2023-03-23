import { useKibana } from '@kbn/kibana-react-plugin/public';
import { KibanaServices } from '../types';

export const useKibanaServices = (): KibanaServices => {
  return useKibana<KibanaServices>().services;
};
