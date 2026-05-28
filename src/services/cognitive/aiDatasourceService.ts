import api from "~/services/api";
import type { AiDatasourceDTO, AiDatasourcePageDTO } from "~/types/cognitive-datasource";

export const aiDatasourceService = {
    addAiDatasource(companyId: number, userId: number, datasource: AiDatasourceDTO) {
        return api.post<AiDatasourceDTO>(`/v0/cognitive/ai/datasource/add/companyId/${companyId}/userId/${userId}`, datasource);
    },

    updateAiDatasource(companyId: number, userId: number, datasourceId: number, datasource: AiDatasourceDTO) {
        return api.put<AiDatasourceDTO>(`/v0/cognitive/ai/datasource/update/companyId/${companyId}/userId/${userId}/valueDatasourceId/${datasourceId}`, datasource);
    },

    getAiDatasources(companyId: number, userId: number, valueCompanyId: string, params: { name?: string; page?: number; size?: number }) {
        return api.get<AiDatasourcePageDTO>(`/v0/cognitive/ai/datasource/list/companyId/${companyId}/userId/${userId}/valueCompanyId/${valueCompanyId}`, {
            params
        });
    }
};
