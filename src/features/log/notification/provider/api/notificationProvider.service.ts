import api from '~/services/api';
import type { 
    LogsProviderNotificationPage, 
    LogsProviderNotificationDetail, 
    Company, 
    Provider,
    NotificationType
} from '../interfaces/notificationProvider.interface';

export const getLogsProviderNotificationList = async (
    companyId: number,
    userId: number,
    providerId: number,
    params: { dateFrom?: string; dateTo?: string; page?: number; size?: number }
): Promise<LogsProviderNotificationPage> => {
    const response = await api.get(`/v0/logs/provider/notification/list/companyId/${companyId}/userId/${userId}/providerId/${providerId}`, { params });
    return response.data;
};

export const getLogsProviderNotificationDetail = async (
    companyId: number,
    userId: number,
    notificationId: number
): Promise<LogsProviderNotificationDetail> => {
    // Note: Based on user's controller, the prefix is /logs instead of /v0/logs
    const response = await api.get(`/v0/logs/provider/notification/detail/companyId/${companyId}/userId/${userId}/notificationId/${notificationId}`);
    return response.data;
};

export const getCompanies = async (
    authCompanyId: number,
    authUserId: number
): Promise<Company[]> => {
    const response = await api.get(`/v0/user/companies/list/companyId/${authCompanyId}/userId/${authUserId}`);
    return response.data;
};

export const getProviders = async (
    authCompanyId: number,
    authUserId: number,
    valueCompanyId: number,
    notificationType: NotificationType
): Promise<Provider[]> => {
    const response = await api.get(`/v0/notification/provider/list/companyId/${authCompanyId}/userId/${authUserId}/valueCompanyId/${valueCompanyId}/notificationType/${notificationType}`);
    return response.data;
};
