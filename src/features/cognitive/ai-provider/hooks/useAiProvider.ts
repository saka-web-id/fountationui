import { ref } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { aiProviderService } from '~/services/cognitive/aiProviderService';
import type { AiProviderDTO } from '~/types/registry';
import { setGlobalSuccess } from '~/stores/globalSuccess';
import { setGlobalError } from '~/stores/globalError';
import { setGlobalLoading } from '~/stores/globalLoading';

export function useAiProvider() {
    const authStore = useAuthStore();
    const loading = ref(false);

    const addAiProvider = async (provider: AiProviderDTO) => {
        loading.value = true;
        setGlobalLoading(true);
        try {
            const companyId = authStore.user?.company?.companyId;
            const userId = authStore.user?.id;
            if (!companyId || !userId) throw new Error("User or Company not found");

            await aiProviderService.addAiProvider(companyId, userId, provider);
            setGlobalSuccess("AI Provider added successfully");
            return true;
        } catch (error: any) {
            setGlobalError(error.message || "Failed to add AI provider");
            return false;
        } finally {
            loading.value = false;
            setGlobalLoading(false);
        }
    };

    const updateAiProvider = async (provider: AiProviderDTO) => {
        loading.value = true;
        setGlobalLoading(true);
        try {
            const companyId = authStore.user?.company?.companyId;
            const userId = authStore.user?.id;
            if (!companyId || !userId) throw new Error("User or Company not found");

            await aiProviderService.updateAiProvider(companyId, userId, provider);
            setGlobalSuccess("AI Provider updated successfully");
            return true;
        } catch (error: any) {
            setGlobalError(error.message || "Failed to update AI provider");
            return false;
        } finally {
            loading.value = false;
            setGlobalLoading(false);
        }
    };

    return {
        loading,
        addAiProvider,
        updateAiProvider
    };
}
