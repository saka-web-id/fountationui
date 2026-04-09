import type { CompanySimplePayload } from "~/features/company/interfaces/company.interfaces.ts";

export type NotificationType = 'SMS' | 'EMAIL' | 'WHATAPPS';

export interface LogsProviderNotificationSimple {
    id: number;
    notificationId: number;
    companyId: number;
    providerId: number;
    executionTime: number;
    createdAt: string; // ISO string or similar
}

export interface LogsProviderNotificationPage {
    logProviderNotificationData: LogsProviderNotificationSimple[];
    logProviderNotificationTotalItems: number;
    logProviderNotificationPage: number;
    logProviderNotificationSize: number;
}

export interface LogsProviderNotificationDetail {
    id: number;
    notificationId: number;
    companyId: number;
    providerId: number;
    executionTime: number;
    createdAt: string;
    requestMethod: string;
    requestUrl: string;
    requestBody: string;
    responseCode: string;
    responseBody: string;
}

export interface FilterParams {
    notificationType: NotificationType;
    companyId: number | null;
    providerId: number | null;
    dateFrom: string;
    dateTo: string;
    page: number;
    size: number;
}

export interface Company extends CompanySimplePayload {}

export interface Provider {
    providerId: number;
    providerName: string;
}
