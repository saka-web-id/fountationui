import api from "~/services/api";
import type { ConfigParameterDTO, ConfigParameterPageDTO } from "~/types/registry";

export const configParameterService = {
    addConfigParameter(companyId: number, userId: number, configParameter: ConfigParameterDTO) {
        return api.post<ConfigParameterDTO>(`/v0/registry/config/parameter/add/companyId/${companyId}/userId/${userId}`, configParameter);
    },

    updateConfigParameter(companyId: number, userId: number, valueId: number, configParameter: ConfigParameterDTO) {
        return api.post<ConfigParameterDTO>(`/v0/registry/config/parameter/update/companyId/${companyId}/userId/${userId}/valueId/${valueId}`, configParameter);
    },

    getConfigParameters(companyId: number, userId: number, params: { key?: string; page?: number; size?: number }) {
        return api.get<ConfigParameterPageDTO>(`/v0/registry/config/parameter/list/companyId/${companyId}/userId/${userId}`, {
            params
        });
    }
};
