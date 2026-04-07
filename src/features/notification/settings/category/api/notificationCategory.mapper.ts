import type {
    NotificationCategory,
    NotificationCategoryPayload,
    NotificationCategorySimple,
    NotificationCategorySimplePayload
} from "~/features/notification/settings/category/interfaces/notificationCategory.interfaces.ts";

export const toNotificationCategorySimple = (payload: NotificationCategorySimplePayload): NotificationCategorySimple => {
    return {
        id: payload.notiCategoryId,
        name: payload.notiCategoryName,
        priority: payload.notiCategoryPriority,
        createdAt: payload.notiCategoryCreatedAt
    };
};

export const toNotificationCategory = (payload: NotificationCategoryPayload): NotificationCategory => {
    return {
        id: payload.notiCategoryId,
        companyId: payload.notiCategoryCompanyId,
        defaultProviderId: payload.notiCategoryDefaultProviderId,
        name: payload.notiCategoryName,
        description: payload.notiCategoryDescription,
        priority: payload.notiCategoryPriority,
        retryPolicy: payload.notiCategoryRetryPolicy,
        createdAt: payload.notiCategoryCreatedAt
    };
};

export const toNotificationCategoryPayload = (data: NotificationCategory): NotificationCategoryPayload => {
    return {
        notiCategoryId: data.id,
        notiCategoryCompanyId: data.companyId,
        notiCategoryDefaultProviderId: data.defaultProviderId,
        notiCategoryName: data.name,
        notiCategoryDescription: data.description,
        notiCategoryPriority: data.priority,
        notiCategoryRetryPolicy: data.retryPolicy,
        notiCategoryCreatedAt: data.createdAt
    };
};
