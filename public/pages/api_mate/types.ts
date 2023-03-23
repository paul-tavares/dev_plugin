import { HttpResponse } from '@kbn/core-http-browser';

export interface ApiMateState {
  url: string;
  httpVerb: string;
  response?: HttpResponse;
}
