import api from "~/services/api.ts";
import type { ProviderPayload } from '~/features/notification/providers/interfaces/provider.payload'

export const getNotificationProviders = async (
    companyId: number,
    userId: number,
    companyIdParam: number,
    notificationType: string
) : Promise<ProviderPayload> => {
    const response = await api.get(`/v0/notification/provider/list/companyId/${companyId}/userId/${userId}/valueCompanyId/${companyIdParam}/notificationType/${notificationType}`);
    return response.data;
};