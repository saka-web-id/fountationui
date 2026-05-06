import api from "~/services/api";
import type { CurrencyDTO, CurrencyPageDTO } from "~/types/registry";

export const currencyService = {
    addCurrencies(companyId: number, userId: number, currencies: CurrencyDTO[]) {
        return api.post<CurrencyDTO[]>(`/v0/registry/currency/add/companyId/${companyId}/userId/${userId}`, currencies);
    },

    getCurrencies(companyId: number, userId: number, params: { name?: string; page?: number; size?: number }) {
        return api.get<CurrencyPageDTO>(`/v0/registry/currency/list/companyId/${companyId}/userId/${userId}`, {
            params
        });
    }
};
