import api from "../../api.ts";

export interface LogsApi {
    logId: number;
    logCorrelationId: string;
    logMethod: string;
    logEndPoint: string;
    logStatusCode: number;
    logExecutionTime: number;
    logCompanyId: number;
    logUserId: number;
    logCreatedAt: number;
    logRequest?: {
        logRequestId: number;
        logRequestBody: string;
    };
    logResponse?: {
        logResponseId: number;
        logResponseBody: string;
    };
}

export interface LogsApiPageResponse {
    logApiData: LogsApi[];
    logApiTotalItems: number;
    logApiPage: number;
    logApiSize: number;
}

export const getLogsApi = async (
    companyId: number,
    userId: number,
    params: { endpoint?: string; dateFrom?: string; dateTo?: string; page?: number; size?: number }
): Promise<LogsApiPageResponse> => {
    const response = await api.get(`/v0/logs/api/list/companyId/${companyId}/userId/${userId}`, { params });
    return response.data;
};

export const getLogApiDetail = async (
    companyId: number,
    userId: number,
    id: number
): Promise<LogsApi> => {
    const response = await api.get(`/v0/logs/api/detail/companyId/${companyId}/userId/${userId}/id/${id}`);
    return response.data;
};