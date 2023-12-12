import { HttpSetup } from '@kbn/core-http-browser';

export type HttpMethod = keyof Pick<
  HttpSetup,
  'delete' | 'get' | 'head' | 'options' | 'patch' | 'post' | 'put'
>;

export type DestinationSystem = 'kibana' | 'elasticsearch';

export type KeyValueList = Array<{ name: string; value: string; id: string }>;

export interface ApiMateState {
  destination: DestinationSystem;
  url: string;
  httpVerb: HttpMethod;
  loading: boolean;
  requestBody: string;
  requestHeaders: KeyValueList;
  requestParams: KeyValueList;
  responseBody: string;
  responseStatus: number;
  responseStatusText: string;
}

export type ApiMateHistoryItem = Pick<
  ApiMateState,
  'url' | 'httpVerb' | 'requestBody' | 'requestHeaders' | 'requestParams' | 'destination'
> & {
  created: string;
  wasSuccess: boolean;
};
