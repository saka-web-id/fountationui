import api from "~/services/api";
import type { UoMDTO, UoMPageDTO } from "~/types/registry";

export const uomService = {
    addUoms(companyId: number, userId: number, uoms: UoMDTO[]) {
        return api.post<UoMDTO[]>(`/v0/registry/uom/add/companyId/${companyId}/userId/${userId}`, uoms);
    },

    getUoms(companyId: number, userId: number, params: { name?: string; page?: number; size?: number }) {
        return api.get<UoMPageDTO>(`/v0/registry/uom/list/companyId/${companyId}/userId/${userId}`, {
            params
        });
    }
};
