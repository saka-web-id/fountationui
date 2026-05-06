import api from "~/services/api";
import type { CountryDTO, CountryPageDTO } from "~/types/registry";

export const countryService = {
    addCountries(companyId: number, userId: number, countries: CountryDTO[]) {
        return api.post<CountryDTO[]>(`/v0/registry/country/add/companyId/${companyId}/userId/${userId}`, countries);
    },

    getCountries(companyId: number, userId: number, params: { name?: string; page?: number; size?: number }) {
        return api.get<CountryPageDTO>(`/v0/registry/country/list/companyId/${companyId}/userId/${userId}`, {
            params
        });
    }
};
