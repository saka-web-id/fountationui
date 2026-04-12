export type NotificationStatus = 'DRAFT' | 'SCHEDULED' | 'QUEUED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELED' | 'FAILED';

export interface NotificationCampaignDTO {
    notiCampaignId: number;
    notiCampaignCompanyId: number;
    notiCampaignTemplateId: number;
    notiCampaignTitle: string;
    notiCampaignDescription: string;
    notiCampaignStatus: NotificationStatus;
    notiCampaignMetadata: Record<string, any>;
    notiCampaignScheduledAt: string;
    notiCampaignCreatedAt: string;
    notiCampaignNotifications: any[];
}

export interface NotificationSimpleDTO {
    notiId: number;
    notiRecipientAddress: string;
    notiStatus: NotificationStatus;
    notiErrorMessage: string;
    notiCreatedAt: string;
    notiUpdatedAt: string;
}

export interface NotificationPageDTO {
    notificationData: NotificationSimpleDTO[];
    notificationTotalItems: number;
    notificationPage: number;
    notificationSize: number;
}

export interface NotificationHistoryDTO {
    notiHistoryId: number;
    notiId: number;
    notiHistoryStatus: NotificationStatus;
    notiHistoryEventName: string;
    notiHistoryMetadata: Record<string, any>;
}

export interface HistoryFilterValues {
    campaignId: number | null;
    campaignName: string;
    dateFrom: string;
    dateTo: string;
}
