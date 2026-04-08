import api from "~/services/api.ts";
import type { CompanySimplePayload } from "~/features/company/interfaces/company.interfaces";

export const getCompanies = async (
    companyId: number,
    userId: number
): Promise<CompanySimplePayload> => {
    const response = await api.get(`/v0/user/companies/list/companyId/'${companyId}"/userId/"${userId} `);
    return response.data;
};