import api from "~/services/api";
import type { CountryStateDTO, CountryStatePageDTO } from "~/types/registry";

export const countryStateService = {
    addCountryStates(companyId: number, userId: number, countryStates: CountryStateDTO[]) {
        return api.post<CountryStateDTO[]>(`/v0/registry/country/state/add/companyId/${companyId}/userId/${userId}`, countryStates);
    },

    getCountryStates(companyId: number, userId: number, countryId: number, params: { name?: string; page?: number; size?: number }) {
        return api.get<CountryStatePageDTO>(`/v0/registry/country/state/list/companyId/${companyId}/userId/${userId}/countryId/${countryId}`, {
            params
        });
    }
};
