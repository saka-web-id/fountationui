import api from "~/services/api";
import type { LanguageDTO, LanguagePageDTO } from "~/types/registry";

export const languageService = {
    addLanguages(companyId: number, userId: number, languages: LanguageDTO[]) {
        return api.post<LanguageDTO[]>(`/v0/registry/language/add/companyId/${companyId}/userId/${userId}`, languages);
    },

    getLanguages(companyId: number, userId: number, params: { name?: string; page?: number; size?: number }) {
        return api.get<LanguagePageDTO>(`/v0/registry/language/list/companyId/${companyId}/userId/${userId}`, {
            params
        });
    }
};
