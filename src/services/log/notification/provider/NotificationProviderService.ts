import api from "~/services/api.ts";
import type {
    NotificationProviderConfigPayload
} from "~/features/notification/settings/email/hooks/forms/useEmailSettingForm.ts";


export const getNotificationProviderConfig = async (
    companyId: number,
    userId: number,
    providerId: number
): Promise<NotificationProviderConfigPayload> => {
    const response = await api.get(`/v0/notification/provider/config/detail/companyId/${companyId}/userId/${userId}/providerId/${providerId}`);
    return response.data;
};