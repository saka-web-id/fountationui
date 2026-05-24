import api from "~/services/api";
import type { ObjectStorageProviderDTO, ObjectStorageProviderPageDTO } from "~/types/registry";

export const objectStorageProviderService = {
    addStorageProvider(companyId: number, userId: number, provider: ObjectStorageProviderDTO) {
        return api.post<ObjectStorageProviderDTO>(`/v0/objects/storage/provider/add/companyId/${companyId}/userId/${userId}`, provider);
    },

    getStorageProviders(companyId: number, userId: number, params: { name?: string; page?: number; size?: number }) {
        return api.get<ObjectStorageProviderPageDTO>(`/v0/objects/storage/provider/list/companyId/${companyId}/userId/${userId}`, {
            params
        });
    }
};
