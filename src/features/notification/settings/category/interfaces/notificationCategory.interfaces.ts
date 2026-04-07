import type { Instant } from "~/types/common";

export interface NotificationCategorySimplePayload {
    notiCategoryId: number;
    notiCategoryName: string;
    notiCategoryPriority: number;
    notiCategoryCreatedAt: Instant;
}

export interface NotificationCategoryPayload {
    notiCategoryId?: number;
    notiCategoryCompanyId: number;
    notiCategoryDefaultProviderId: number;
    notiCategoryName: string;
    notiCategoryDescription: string;
    notiCategoryPriority: number;
    notiCategoryRetryPolicy: Record<string, any>;
    notiCategoryCreatedAt?: Instant;
}

export interface NotificationCategorySimple {
    id: number;
    name: string;
    priority: number;
    createdAt: string;
}

export interface NotificationCategory {
    id?: number;
    companyId: number;
    defaultProviderId: number;
    name: string;
    description: string;
    priority: number;
    retryPolicy: Record<string, any>;
    createdAt?: string;
}
