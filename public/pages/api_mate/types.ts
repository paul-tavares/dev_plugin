import { HttpResponse, HttpSetup } from '@kbn/core-http-browser';

export type HttpMethod = keyof Pick<
  HttpSetup,
  'delete' | 'get' | 'head' | 'options' | 'patch' | 'post' | 'put'
>;

export interface ApiMateState {
  url: string;
  httpVerb: HttpMethod;
  loading: boolean;
  response?: HttpResponse;
}
