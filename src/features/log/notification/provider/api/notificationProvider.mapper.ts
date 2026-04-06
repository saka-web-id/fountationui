import type { 
    LogsProviderNotificationSimple, 
    LogsProviderNotificationDetail 
} from '../interfaces/notificationProvider.interface';

export const mapLogsToUI = (data: any[]): LogsProviderNotificationSimple[] => {
    return data.map(item => ({
        ...item,
        createdAt: item.createdAt ? new Date(item.createdAt).toLocaleString() : ''
    }));
};

export const mapDetailToUI = (item: any): LogsProviderNotificationDetail => {
    return {
        ...item,
        createdAt: item.createdAt ? new Date(item.createdAt).toLocaleString() : ''
    };
};
