import api from "../../api.ts";

export interface LogsGateway {
    logGatewayId: number;
    logGatewayCorrelationId: string;
    logGatewayMethod: string;
    logGatewayEndPoint: string;
    logGatewayStatusCode: number;
    logGatewayExecutionTime: number;
    logGatewayClientIp: string;
    logGatewayCreatedAt: number;
}

export interface LogsGatewayPageResponse {
    logGatewayData: LogsGateway[];
    logGatewayTotalItems: number;
    logGatewayPage: number;
    logGatewaySize: number;
}

export const getLogsGateway = async (
    companyId: number, 
    userId: number, 
    params: { endpoint?: string; dateFrom?: string; dateTo?: string; page?: number; size?: number }
): Promise<LogsGatewayPageResponse> => {
    const response = await api.get(`/v0/logs/gateway/list/companyId/${companyId}/userId/${userId}`, { params });
    return response.data;
};

export const getLogGatewayDetail = async (
    companyId: number, 
    userId: number, 
    id: number
): Promise<LogsGateway> => {
    const response = await api.get(`/v0/logs/gateway/detail/companyId/${companyId}/userId/${userId}/id/${id}`);
    return response.data;
};

