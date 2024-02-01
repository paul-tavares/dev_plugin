// -------------------------------------------------
// API ROUTES
// -------------------------------------------------

export const API_BASE_PATH = `/api/devPlugin`;

export const API_INFO_ROUTE = `${API_BASE_PATH}/info`;

export const API_FILE_LIST_ROUTE = `${API_BASE_PATH}/file`;
export const API_FILE_DOWNLOAD_ROUTE = `${API_FILE_LIST_ROUTE}/{metaIndex}/{dataIndex}/{fileId}/download`;
