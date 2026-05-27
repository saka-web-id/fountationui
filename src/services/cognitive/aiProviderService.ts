import api from "~/services/api";
import type { AiProviderDTO, AiProviderPageDTO } from "~/types/registry";

export const aiProviderService = {
    addAiProvider(companyId: number, userId: number, provider: AiProviderDTO) {
        return api.post<AiProviderDTO>(`/v0/cognitive/ai/provider/add/companyId/${companyId}/userId/${userId}`, provider);
    },

    updateAiProvider(companyId: number, userId: number, provider: AiProviderDTO) {
        return api.put<AiProviderDTO>(`/v0/cognitive/ai/provider/update/companyId/${companyId}/userId/${userId}/valueProviderId/${provider.aiProviderId}`, provider);
    },

    getAiProviders(companyId: number, userId: number, params: { name?: string; page?: number; size?: number }) {
        return api.get<AiProviderPageDTO>(`/v0/cognitive/ai/provider/list/companyId/${companyId}/userId/${userId}`, {
            params
        });
    }
};
