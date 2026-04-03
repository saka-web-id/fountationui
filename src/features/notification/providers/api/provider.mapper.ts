import type {ProviderPayload} from "~/features/notification/providers/interfaces/provider.payload.ts";

export const mapProviderDataFromApi = (apiData: ProviderPayload): ProviderPayload => ({
    providerId: apiData.providerId,
    providerCompanyId: apiData.providerCompanyId,
    providerName: apiData.providerName,
    providerType: apiData.providerType,
    providerEngine: apiData.providerEngine,
    providerSlug: apiData.providerSlug,
    providerIsActive: apiData.providerIsActive,
    providerPriority: apiData.providerPriority,
    providerCreatedAt: apiData.providerCreatedAt
});