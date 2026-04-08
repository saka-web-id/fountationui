export type NotificationType = 'EMAIL' | 'SMS' | 'WHATSAPP' | 'PUSH';

export interface TemplateSimpleDTO {
    notiTemplateId: number;
    notiTemplateName: string;
    notiTemplateType: NotificationType;
    notiTemplateSubject: string;
}

export interface TemplateDTO {
    notiTemplateId: number;
    notiTemplateCompanyId: number;
    notiTemplateProviderId: number;
    notiTemplateName: string;
    notiTemplateType: NotificationType;
    notiTemplateSubject: string;
    notiTemplateContentJson: Record<string, any>;
    notiTemplateContentCompiled: string;
    notiTemplateCreatedAt?: string;
    notiTemplateUpdatedAt?: string;
}
