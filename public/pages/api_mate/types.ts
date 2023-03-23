import { HttpResponse } from '@kbn/core-http-browser';

export interface ApiMateState {
  url: string;
  httpVerb: string;
  loading: boolean;
  response?: HttpResponse;
}
