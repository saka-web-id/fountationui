import { ref } from 'vue';
import { useAuthStore } from '~/stores/auth.ts';
import { objectStorageProviderService } from '~/services/registry/objectStorageProviderService.ts';
import type { ObjectStorageProviderDTO } from '~/types/registry.ts';
import { setGlobalSuccess } from '~/stores/globalSuccess.ts';
import { setGlobalError } from '~/stores/globalError.ts';
import { setGlobalLoading } from '~/stores/globalLoading.ts';

export function useStorageProvider() {
    const authStore = useAuthStore();
    const loading = ref(false);

    const addStorageProvider = async (provider: ObjectStorageProviderDTO) => {
        loading.value = true;
        setGlobalLoading(true);
        try {
            const companyId = authStore.user?.company?.companyId;
            const userId = authStore.user?.id;
            if (!companyId || !userId) throw new Error("User or Company not found");

            await objectStorageProviderService.addStorageProvider(companyId, userId, provider);
            setGlobalSuccess("Storage provider added successfully");
            return true;
        } catch (error: any) {
            setGlobalError(error.message || "Failed to add storage provider");
            return false;
        } finally {
            loading.value = false;
            setGlobalLoading(false);
        }
    };

    return {
        loading,
        addStorageProvider
    };
}
