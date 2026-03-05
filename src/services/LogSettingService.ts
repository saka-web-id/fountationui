import api from "./api";

export interface LogSetting {
    logSettingId?: number;
    logSettingEndpoint: string;
    logSettingMethod: string;
    logSettingLogFormat: string;
    logSettingEnabled: boolean;
    logSettingCompanyId: number;
    logSettingCreatedAt?: string;
    logSettingUpdatedAt?: string;
}

export const getLogSettingsByCompany = async (companyId: number, userId: number, valueCompanyId: number) => {
    const response = await api.get(`/logs/setting/list/companyId/${companyId}/userId/${userId}/valueCompanyId/${valueCompanyId}`);
    return response.data;
};

export const getLogSettingDetail = async (companyId: number, userId: number, valueLogSettingId: number) => {
    const response = await api.get(`/logs/setting/detail/companyId/${companyId}/userId/${userId}/valueLogSettingId/${valueLogSettingId}`);
    return response.data;
};

export const addLogSetting = async (companyId: number, userId: number, payload: LogSetting) => {
    const response = await api.post(`/logs/setting/add/companyId/${companyId}/userId/${userId}`, payload);
    return response.data;
};

export const updateLogSetting = async (companyId: number, userId: number, payload: LogSetting) => {
    const response = await api.post(`/logs/setting/update/companyId/${companyId}/userId/${userId}`, payload);
    return response.data;
};
