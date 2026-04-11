import '@tanstack/vue-table';

declare module '@tanstack/vue-table' {
  interface ColumnMeta<TData, TValue> {
    className?: string;
  }
}

export type NotificationStatus = 'FAILED' | 'SCHEDULED' | 'DRAFT' | 'QUEUED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELED';
export type NotificationType = 'EMAIL' | 'SMS' | 'WHATSAPP' | 'PUSH';

export interface NotificationCampaignSimpleDTO {
    notiCampaignId: number;
    notiCampaignTitle: string;
    notiCampaignStatus: NotificationStatus;
    notiCampaignScheduledAt: string | Date;
}

export interface NotificationCampaignDTO {
    notiCampaignId: number;
    notiCampaignCompanyId: number;
    notiCampaignTemplateId: number;
    notiCampaignTitle: string;
    notiCampaignDescription: string;
    notiCampaignStatus: NotificationStatus;
    notiCampaignMetadata: Record<string, any>;
    notiCampaignScheduledAt: string | Date;
    notiCampaignCreatedAt: string | Date;
    notiCampaignNotifications: NotificationDTO[];
}

export interface NotificationDTO {
    notiId: number;
    notiCompanyId: number;
    notiCampaignId: number;
    notiCategoryId: number;
    notiProviderId: number;
    notiRecipientAddress: string;
    notiProviderRef: string;
    notiStatus: NotificationStatus;
    notiRetryCount: number;
    notiErrorMessage: string;
    notiCreatedAt: string | Date;
    notiUpdatedAt: string | Date;
}

export interface TemplateSimpleDTO {
    notiTemplateId: number;
    notiTemplateName: string;
    notiTemplateType: NotificationType;
    notiTemplateSubject: string;
}

export interface NotificationCategorySimpleDTO {
    notiCategoryId: number;
    notiCategoryName: string;
    notiCategoryPriority: number;
    notiCategoryCreatedAt: string | Date;
}
