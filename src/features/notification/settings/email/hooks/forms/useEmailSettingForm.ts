import {useFieldArray, useForm} from "vee-validate";
import {useProviderSchema} from "../schemas/provider.schema.ts";
import {computed} from "vue";

export interface NotificationProviderConfigPayload {
    providerConfigId: number;
    providerId: number;
    providerConfigKey: string;
    providerConfigValue: string;
    providerConfigSecret: boolean;
    providerConfigUpdateAt: string;
}

export interface NotificationProviderPayload {
    providerId: number;
    providerCompanyId: number;
    providerName: string;
    providerType: string;
    providerSlug: string;
    providerIsActive: boolean;
    providerPriority: number;
    providerCreatedAt: string;
    providerConfigs: NotificationProviderConfigPayload[];
}

export const mapProviderFormFromApi = (apiData: NotificationProviderPayload): NotificationProviderPayload => ({
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
    // 1. Inisialisasi Form Utama
    const { defineField, handleSubmit, setValues, resetForm, values, errors, meta } = useForm<NotificationProviderPayload>({
        validationSchema: useProviderSchema(),
        initialValues: {
            providerId: 0,
            providerCompanyId: 0,
            providerName: "",
            providerType: "EMAIL",
            providerSlug: "",
            providerIsActive: true,
            providerPriority: 1,
            providerCreatedAt: new Date().toISOString(),
            providerConfigs: [],
        }
    });

    // 2. Gunakan useFieldArray untuk mengelola list configurations
    // Ini otomatis terhubung ke 'providerConfigs' di dalam initialValues
    const { remove, push, update, replace, fields } = useFieldArray<NotificationProviderConfigPayload>('providerConfigs');

    // Buat computed yang mengekstrak nilai asli dari fields
    // Ini yang akan menjamin BaseTable refresh saat update() dipanggil
    const configsData = computed(() => fields.value.map(f => f.value));

    // 3. Define fields untuk Master Provider
    const [providerId] = defineField('providerId');
    const [providerName] = defineField('providerName');
    const [providerType] = defineField('providerType');
    const [providerSlug] = defineField('providerSlug');
    const [providerIsActive] = defineField('providerIsActive');
    const [providerPriority] = defineField('providerPriority');

    return {
        handleSubmit,
        setValues,
        resetForm,
        values,
        errors,
        meta,

        // Master Fields
        providerId,
        providerName,
        providerType,
        providerSlug,
        providerIsActive,
        providerPriority,

        // Config Array Helpers (Untuk dipakai di Component)
        configs: configsData, // Data untuk Tabel
        addConfig: push,       // Fungsi tambah (Offcanvas Add)
        updateConfig: update, // Fungsi edit (Offcanvas Edit)
        removeConfig: remove, // Fungsi hapus (Action Table)
        replaceConfigs: replace // Fungsi isi ulang (Saat Load Data API)
    }
}