export interface DevPluginApiDetailsResponse<T = any> {
  data: T;
}

export interface DevPluginApiListResponse<T = any> extends DevPluginApiDetailsResponse<T> {
  total: number;
  page: number;
  perPage: number;
}
