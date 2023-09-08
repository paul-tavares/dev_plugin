import { HttpFetchQuery, HttpSetup } from '@kbn/core-http-browser';

export type HttpMethod = keyof Pick<
  HttpSetup,
  'delete' | 'get' | 'head' | 'options' | 'patch' | 'post' | 'put'
>;

export interface ApiMateState {
  url: string;
  httpVerb: HttpMethod;
  loading: boolean;
  requestBody: string;
  requestHeaders: Record<string, string>;
  requestParams: HttpFetchQuery;
  responseBody: string;
  responseStatus: number;
  responseStatusText: string;
}

export type ApiMateHistoryItem = Pick<
  ApiMateState,
  'url' | 'httpVerb' | 'requestBody' | 'requestHeaders' | 'requestParams'
> & {
  created: string;
  wasSuccess: boolean;
};
