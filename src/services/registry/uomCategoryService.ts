import api from "~/services/api";
import type { UoMCategoryDTO, UoMCategoryPageDTO } from "~/types/registry";

export const uomCategoryService = {
    addUomCategoryBatch(companyId: number, userId: number, categories: UoMCategoryDTO[]) {
        return api.post<UoMCategoryDTO[]>(`/v0/registry/uom/category/add/batch/companyId/${companyId}/userId/${userId}`, categories);
    },

    addUomCategorySingle(companyId: number, userId: number, category: UoMCategoryDTO) {
        return api.post<UoMCategoryDTO>(`/v0/registry/uom/category/add/companyId/${companyId}/userId/${userId}`, category);
    },

    getUomCategories(companyId: number, userId: number, params: { name?: string; page?: number; size?: number }) {
        return api.get<UoMCategoryPageDTO>(`/v0/registry/uom/category/list/companyId/${companyId}/userId/${userId}`, {
            params
        });
    }
};
