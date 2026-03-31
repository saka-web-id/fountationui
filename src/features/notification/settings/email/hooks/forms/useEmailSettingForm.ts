import { useForm } from "vee-validate";
import {useProviderSchema} from "../schemas/provider.schema.ts";

export interface ProviderPayload {
    providerId: number;
    providerCompanyId: number;
    providerName: string;
    providerType: string;
    providerSlug: string;
    providerIsActive: boolean;
    providerPriority: number;
    providerCreatedAt: string;
    providerConfigs: ProviderConfigPayload[];
}

export interface ProviderConfigPayload {
    providerConfigId: number;
    providerId: number;
    providerConfigKey: string;
    providerConfigValue: string;
    providerConfigSecret: boolean;
    providerConfigUpdateAt: string;
}

export const mapProviderFormFromApi = (apiData: ProviderPayload): ProviderPayload => ({
    providerId: apiData.providerId,
    providerCompanyId: apiData.providerCompanyId,
    providerName: apiData.providerName,
    providerType: apiData.providerType,
    providerSlug: apiData.providerSlug,
    providerIsActive: apiData.providerIsActive,
    providerPriority: apiData.providerPriority,
    providerCreatedAt: apiData.providerCreatedAt,
    providerConfigs: apiData.providerConfigs,
});

export function useProviderPayload() {
    const { defineField, handleSubmit, setValues, resetForm, values } = useForm<ProviderPayload>({
        validationSchema: useProviderSchema(),
        initialValues: {
            providerId: 0,
            providerCompanyId: 0,
            providerName: "",
            providerType: "",
            providerSlug: "",
            providerIsActive: false,
            providerPriority: 0,
            providerCreatedAt: "",
            providerConfigs: [], // Kosongkan secara default agar dinamis
        }
    });

    // Define fields dengan atribut untuk v-bind
    const [providerId, providerIdAttrs] = defineField('providerId');
    const [providerCompanyId, providerCompanyIdAttrs] = defineField('providerCompanyId');
    const [providerName, providerNameAttrs] = defineField('providerName');
    const [providerType, providerTypeAttrs] = defineField('providerType');
    const [providerSlug, providerSlugAttrs] = defineField('providerSlug');
    const [providerIsActive, providerIsActiveAttrs] = defineField('providerIsActive');
    const [providerPriority, providerPriorityAttrs] = defineField('providerPriority');
    const [providerCreatedAt, providerCreatedAtAttrs] = defineField('providerCreatedAt');

    return {
        handleSubmit,
        setValues,
        resetForm,
        values, // Sangat berguna untuk melihat state form saat debugging

        providerId,
        providerIdAttrs,
        providerCompanyId,
        providerCompanyIdAttrs,
        providerName,
        providerNameAttrs,
        providerType,
        providerTypeAttrs,
        providerSlug,
        providerSlugAttrs,
        providerIsActive,
        providerIsActiveAttrs,
        providerPriority,
        providerPriorityAttrs,
        providerCreatedAt,
        providerCreatedAtAttrs
    }
}